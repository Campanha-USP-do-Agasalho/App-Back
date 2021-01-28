import { Name, PeriodId, SpecialName } from '@entities'

import { Either, left, right } from '@shared/Either'

import {
  InvalidNameError,
  InvalidYearError,
  InvalidSemesterError
} from './errors'

export class Event {
  private group: Name
  private title: SpecialName
  private period: PeriodId
  private team: string
  private date: {
    begin: Date
    end: Date
  }

  private place: string
  private inscriptionLink: string | null
  private notifications: number[]
  private lists: {
    subscribers: string[]
    presence: string[]
  }

  private constructor(
    group: Name,
    title: SpecialName,
    period: PeriodId,
    team: string,
    beginDate: Date,
    endDate: Date,
    place: string,
    inscriptionLink: string | null,
    notifications: number[],
    subscribersList: string[]
  ) {
    this.group = group
    this.title = title
    this.period = period
    this.team = team
    this.date = {
      begin: beginDate,
      end: endDate
    }
    this.place = place
    this.inscriptionLink = inscriptionLink
    this.notifications = notifications
    this.lists = {
      subscribers: subscribersList,
      presence: []
    }
  }

  get value() {
    return {
      group: this.group.value,
      title: this.title.value,
      period: this.period.value,
      team: this.team,
      date: this.date,
      place: this.place,
      inscriptionLink: this.inscriptionLink,
      notifications: this.notifications,
      lists: this.lists
    }
  }

  public static create(props: {
    group?: string
    title: string
    period: { year: number; semester: number }
    team: string
    date: { begin: number; end: number }
    place: string
    inscriptionLink?: string
    notifications?: number[]
    subscribers?: string[]
  }): Either<
    InvalidNameError | InvalidYearError | InvalidSemesterError,
    Event
  > {
    const titleOrError = SpecialName.create(props.title)
    if (titleOrError.isLeft()) return left(titleOrError.value)
    const title = titleOrError.value

    const groupOrError = Name.create(props.group || props.title)
    if (groupOrError.isLeft()) return left(groupOrError.value)
    const group = groupOrError.value

    const periodIdOrError = PeriodId.create(props.period)
    if (periodIdOrError.isLeft()) return left(periodIdOrError.value)
    const periodId = periodIdOrError.value

    const {
      team,
      date,
      place,
      inscriptionLink,
      notifications,
      subscribers
    } = props

    return right(
      new Event(
        group,
        title,
        periodId,
        team,
        new Date(date.begin),
        new Date(date.end),
        place,
        inscriptionLink || null,
        notifications || [],
        subscribers || []
      )
    )
  }
}
