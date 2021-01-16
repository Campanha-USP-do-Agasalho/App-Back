import { PeriodId } from '@entities'
import { InvalidYearError, InvalidSemesterError } from '@entities/errors'

import { Either, left, right } from '@shared/Either'

export class Period {
  private id: PeriodId
  private teams: string[]
  private coords: string[]
  private members: string[]
  private events: string[] = []

  private constructor(id: PeriodId, teams: string[], coords: string[]) {
    this.id = id
    this.teams = teams
    this.coords = coords
    this.members = [...coords]
  }

  get value() {
    return {
      id: this.id.value,
      members: this.members,
      coords: this.coords,
      events: this.events,
      teams: this.teams
    }
  }

  public static create(props: {
    id: { year: number; semester: number }
    teams?: string[]
    coords?: string[]
  }): Either<InvalidYearError | InvalidSemesterError, Period> {
    const periodIdOrError = PeriodId.create(props.id)
    if (periodIdOrError.isLeft()) return left(periodIdOrError.value)
    const periodId = periodIdOrError.value

    return right(new Period(periodId, props.teams || [], props.coords || []))
  }
}
