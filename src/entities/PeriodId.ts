import { InvalidSemesterError, InvalidYearError } from '@entities/errors'

import { Either, left, right } from '@shared/Either'

export class PeriodId {
  private periodId: string

  private constructor(periodId: string) {
    this.periodId = periodId
  }

  get value() {
    return this.periodId
  }

  public static create(props: {
    year: number
    semester: number
  }): Either<InvalidYearError | InvalidSemesterError, PeriodId> {
    const validation = PeriodId.validate(props.year, props.semester)
    if (validation.valid === false) {
      return left(
        validation.field === 'year'
          ? new InvalidYearError(props.year.toString())
          : new InvalidSemesterError(props.semester.toString())
      )
    }

    return right(new PeriodId(`${props.year}-${props.semester}`))
  }

  public static validate(
    year: number,
    semester: number
  ): { valid: true } | { valid: false; field: 'year' | 'semester' } {
    if (year < 0 || !Number.isInteger(year))
      return { valid: false, field: 'year' }

    if (semester !== 1 && semester !== 2)
      return { valid: false, field: 'semester' }

    return { valid: true }
  }
}
