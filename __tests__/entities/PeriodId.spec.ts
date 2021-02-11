import { PeriodId } from '@entities'
import { InvalidSemesterError, InvalidYearError } from '@entities/errors'

import { left } from '@shared/Either'

describe('Period Id Entity', () => {
  it('Should create a new period id given valids year and semester', () => {
    const periodIdOrError = PeriodId.create({ year: 2020, semester: 1 })

    expect(periodIdOrError.isRight()).toBeTruthy()
    expect((<PeriodId>periodIdOrError.value).value).toBe('2020-1')
  })

  it('Should not create a period with invalid year (< 0)', () => {
    const periodIdOrError = PeriodId.create({ year: -2, semester: 1 })

    expect(periodIdOrError).toEqual(left(new InvalidYearError('-2')))
  })

  it('Should not create a period with invalid year (NaN)', () => {
    const periodIdOrError = PeriodId.create({ year: NaN, semester: 1 })

    expect(periodIdOrError).toEqual(left(new InvalidYearError('NaN')))
  })

  it('Should not create a period with invalid year (float)', () => {
    const periodIdOrError = PeriodId.create({ year: 2020.5, semester: 1 })

    expect(periodIdOrError).toEqual(left(new InvalidYearError('2020.5')))
  })

  it('Should not create a period with invalid semester (< 1)', () => {
    const periodIdOrError = PeriodId.create({ year: 2020, semester: 0 })

    expect(periodIdOrError).toEqual(left(new InvalidSemesterError('0')))
  })

  it('Should not create a period with invalid semester (> 2)', () => {
    const periodIdOrError = PeriodId.create({ year: 2020, semester: 3 })

    expect(periodIdOrError).toEqual(left(new InvalidSemesterError('3')))
  })

  it('Should not create a period with invalid semester (NaN)', () => {
    const periodIdOrError = PeriodId.create({ year: 2020, semester: NaN })

    expect(periodIdOrError).toEqual(left(new InvalidSemesterError('NaN')))
  })

  it('Should not create a period with invalid semester (float)', () => {
    const periodIdOrError = PeriodId.create({ year: 2020, semester: 1.5 })

    expect(periodIdOrError).toEqual(left(new InvalidSemesterError('1.5')))
  })
})
