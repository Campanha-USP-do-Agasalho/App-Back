import { ROLE, Name } from '@entities'
import { InvalidNameError } from '@entities/errors'

import { Either, left, right } from '@shared/Either'

import { Email } from './Email'

export class Member {
  name: Name
  nickName: Name
  image: string
  email: Email
  password: string
  team: {
    [period: string]: string
  }

  course: string
  hasCar: boolean
  wpp: string
  role: ROLE
  periods: string[]
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
    password: string,
    course: string,
    hasCar: boolean,
    wpp: string,
    role: ROLE,
    periods: string[]
  ) {
    this.name = name
    this.nickName = nickName
    this.image = image
    this.email = email
    this.password = password
    this.team = {}
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
      password: this.password,
      team: this.team,
      course: this.course,
      hasCar: this.hasCar,
      wpp: this.wpp,
      role: this.role,
      periods: this.periods,
      notification: this.notification
    }
  }

  public static create(props: {
    name: string
    nickName?: string
    image: string
    email: string
    password: string
    course: string
    hasCar: boolean
    wpp: string
    role: ROLE
    periods: string[]
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

    return right(
      new Member(
        name,
        nickName,
        props.image,
        email,
        props.password,
        props.course,
        props.hasCar,
        props.wpp,
        props.role,
        props.periods
      )
    )
  }
}
