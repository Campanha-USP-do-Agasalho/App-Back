import { Name, Body } from '@entities'
import { InvalidNameError, InvalidBodyError } from '@entities/errors'

import { Either, left, right } from '@shared/Either'

export class Notification {
  title: Name
  body: Body
  members: string[]
  date: Date
  scheduleInit: Date | null
  scheduleEnd: Date | null

  private constructor(
    title: Name,
    body: Body,
    members: string[],
    date: Date,
    scheduleInit: Date | null,
    schudleEnd: Date | null
  ) {
    this.title = title
    this.body = body
    this.members = members
    this.date = date
    this.scheduleInit = scheduleInit
    this.scheduleEnd = schudleEnd
  }

  get value() {
    return {
      title: this.title.value,
      body: this.body.value,
      members: this.members,
      date: this.date,
      scheduleInit: this.scheduleInit,
      scheduleEnd: this.scheduleEnd
    }
  }

  public static create(props: {
    title: string
    body: string
    members: string[]
    date: number
    scheduleInit?: number
    scheduleEnd?: number
  }): Either<InvalidNameError, Notification> {
    const nameOrError = Name.create(props.title)
    if (nameOrError.isLeft()) return left(nameOrError.value)
    const title = nameOrError.value

    const body0rError = Body.create(props.body)
    if (body0rError.isLeft()) return left(body0rError.value)
    const body = body0rError.value

    const date = new Date(props.date)

    const scheduleInit = props.scheduleInit
      ? new Date(props.scheduleInit)
      : null

    const scheduleEnd = props.scheduleEnd ? new Date(props.scheduleEnd) : null

    return right(
      new Notification(
        title,
        body,
        props.members,
        date,
        scheduleInit,
        scheduleEnd
      )
    )
  }
}
