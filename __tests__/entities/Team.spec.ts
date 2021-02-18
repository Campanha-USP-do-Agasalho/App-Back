import { Team } from '@entities'
import { InvalidNameError } from '@entities/errors'

import { left } from '@shared/Either'

describe('Team Entity', () => {
  it('Should create a new team with score object as a null object', () => {
    const teamOrError = Team.create({
      name: 'Nome com algum espaço',
      fullName: 'Infraestrutura'
    })

    expect(teamOrError.isRight()).toBeTruthy()
    expect((<Team>teamOrError.value).value).toStrictEqual({
      name: 'Nome com algum espaço',
      fullName: 'Infraestrutura',
      id: 'nome'
    })
  })

  it('Should create a new team with fullName equal to name if fullName is omitted', () => {
    const teamOrError = Team.create({
      name: 'Entidades'
    })

    expect(teamOrError.isRight()).toBeTruthy()
    expect((<Team>teamOrError.value).value).toStrictEqual({
      name: 'Entidades',
      fullName: 'Entidades',
      id: 'entidades'
    })
  })

  it('Should create a new team with valid id', () => {
    const teamOrError = Team.create({
      name: 'Divulgação',
      id: 'divulgamais'
    })

    expect(teamOrError.isRight()).toBeTruthy()
    expect((<Team>teamOrError.value).value).toStrictEqual({
      name: 'Divulgação',
      id: 'divulgamais',
      fullName: 'Divulgação'
    })
  })

  it('Should not create a team with invalid name', () => {
    const longName = 'A'.repeat(256)
    const teamOrError = Team.create({ name: longName, fullName: 'AAAAA' })

    expect(teamOrError).toEqual(left(new InvalidNameError(longName)))
  })

  it('Should not create a team with invalid fullName', () => {
    const teamOrError = Team.create({ name: 'AAAAA', fullName: 'A' })

    expect(teamOrError).toEqual(left(new InvalidNameError('A')))
  })
})
