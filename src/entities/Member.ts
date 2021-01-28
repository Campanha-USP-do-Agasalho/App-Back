import { ROLE, Name, Password } from '@entities'
import { InvalidNameError } from '@entities/errors'

import { Either, left, right } from '@shared/Either'

import { Email } from './Email'
import { PeriodId } from './PeriodId'

export class Member {
  name: Name
  nickName: Name
  image: string
  email: Email
  password: Password
  team: {
    [period: string]: string
  }

  course: string
  hasCar: boolean
  wpp: string
  role: ROLE
  periods: PeriodId[]
  notification: {
    email: boolean
    all: boolean
    meetings: boolean
    events: boolean
  }

  private constructor(
    name: Name,
    nickName: Name,
    image: string,
    email: Email,
    password: Password,
    team: { [period: string]: string },
    course: string,
    hasCar: boolean,
    wpp: string,
    role: ROLE,
    periods: PeriodId[]
  ) {
    this.name = name
    this.nickName = nickName
    this.image = image
    this.email = email
    this.password = password
    this.team = team
    this.course = course
    this.hasCar = hasCar
    this.wpp = wpp
    this.role = role
    this.periods = periods
    this.notification = {
      email: true,
      all: true,
      meetings: true,
      events: true
    }
  }

  get value() {
    return {
      name: this.name.value,
      nickName: this.nickName.value,
      image: this.image,
      email: this.email.value,
      password: this.password.value,
      team: this.team,
      course: this.course,
      hasCar: this.hasCar,
      wpp: this.wpp,
      role: this.role,
      periods: this.periods.map(period => period.value),
      notification: this.notification
    }
  }

  public static create(props: {
    name: string
    nickName?: string
    image: string
    email: string
    password: string
    initialTeam: string
    course: string
    hasCar: boolean
    wpp: string
    role: ROLE
    initialPeriod: { year: number; semester: number }
  }): Either<InvalidNameError, Member> {
    const nameOrError = Name.create(props.name)
    if (nameOrError.isLeft()) return left(nameOrError.value)
    const name = nameOrError.value

    let nickName = name
    if (props.nickName) {
      const nickNameOrError = Name.create(props.nickName)
      if (nickNameOrError.isLeft()) return left(nickNameOrError.value)
      nickName = nickNameOrError.value
    }

    const email0rError = Email.create(props.email)
    if (email0rError.isLeft()) return left(email0rError.value)
    const email = email0rError.value

    const passwordOrError = Password.create(props.password)
    if (passwordOrError.isLeft()) return left(passwordOrError.value)
    const password = passwordOrError.value

    const period0rError = PeriodId.create(props.initialPeriod)
    if (period0rError.isLeft()) return left(period0rError.value)
    const period = period0rError.value

    const team: {
      [period: string]: string
    } = {}

    team[period.value] = props.initialTeam

    return right(
      new Member(
        name,
        nickName,
        props.image,
        email,
        password,
        team,
        props.course,
        props.hasCar,
        props.wpp,
        props.role,
        [period]
      )
    )
  }
}
