import { InvalidSemesterError } from '@entities/errors'
import { Period } from '@entities/Period'

import { left } from '@shared/Either'

describe('Period Entity', () => {
  it('Should create a new period with valids year and semester', () => {
    const periodOrError = Period.create({ id: { year: 2020, semester: 1 } })

    expect(periodOrError.isRight()).toBeTruthy()
    expect((<Period>periodOrError.value).value).toStrictEqual({
      id: '2020-1',
      teams: [],
      coords: [],
      members: [],
      events: []
    })
  })

  it('Should create a new period with valids year and semester and a teams list', () => {
    const periodOrError = Period.create({
      id: { year: 2020, semester: 1 },
      teams: ['Infra', 'RE']
    })

    expect(periodOrError.isRight()).toBeTruthy()
    expect((<Period>periodOrError.value).value).toStrictEqual({
      id: '2020-1',
      teams: ['Infra', 'RE'],
      coords: [],
      members: [],
      events: []
    })
  })

  it('Should create a new period with valids year and semester and a coords list, it should also set all the coords as members', () => {
    const periodOrError = Period.create({
      id: { year: 2020, semester: 1 },
      coords: ['Psy', 'Klaus']
    })

    expect(periodOrError.isRight()).toBeTruthy()
    expect((<Period>periodOrError.value).value).toStrictEqual({
      id: '2020-1',
      teams: [],
      coords: ['Psy', 'Klaus'],
      members: ['Psy', 'Klaus'],
      events: []
    })
  })

  it('Should create a new period with valids year and semester, a teams list and a coords list, it should also set all the coords as members', () => {
    const periodOrError = Period.create({
      id: { year: 2020, semester: 1 },
      teams: ['Infra', 'RE'],
      coords: ['Psy', 'Klaus']
    })

    expect(periodOrError.isRight()).toBeTruthy()
    expect((<Period>periodOrError.value).value).toStrictEqual({
      id: '2020-1',
      teams: ['Infra', 'RE'],
      coords: ['Psy', 'Klaus'],
      members: ['Psy', 'Klaus'],
      events: []
    })
  })

  it('Should not create a new period with invalid id props', () => {
    const periodOrError = Period.create({ id: { year: 2020, semester: 3 } })

    expect(periodOrError).toEqual(left(new InvalidSemesterError('3')))
  })
})
