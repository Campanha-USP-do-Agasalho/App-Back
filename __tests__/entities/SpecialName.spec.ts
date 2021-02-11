import { SpecialName } from '@entities'
import { InvalidNameError } from '@entities/errors'

import { left } from '@shared/Either'

describe('Special Name Entity', () => {
  it('Should create a new valid name and trim', () => {
    const nameOrError = SpecialName.create('Batatais ')

    expect(nameOrError.isRight()).toBeTruthy()
    expect((<SpecialName>nameOrError.value).value).toBe('Batatais')
  })

  it('Should allow names with space between words', () => {
    const nameOrError = SpecialName.create('Palavra pavrala laarvap joao pedro')

    expect(nameOrError.isRight()).toBeTruthy()
    expect((<SpecialName>nameOrError.value).value).toBe(
      'Palavra pavrala laarvap joao pedro'
    )
  })

  it('Should allow names with stress', () => {
    const nameOrError = SpecialName.create('Goiába')

    expect(nameOrError.isRight()).toBeTruthy()
    expect((<SpecialName>nameOrError.value).value).toBe('Goiába')
  })

  it('Should allow names with special characteres', () => {
    const nameOrError = SpecialName.create('Int&gr@ - 22:00')

    expect(nameOrError.isRight()).toBeTruthy()
    expect((<SpecialName>nameOrError.value).value).toBe('Int&gr@ - 22:00')
  })

  it('Should not create a short name (-2)', () => {
    const nameOrError = SpecialName.create('A')

    expect(nameOrError).toEqual(left(new InvalidNameError('A')))
  })

  it('Should not create a long name (+255)', () => {
    const longName = 'A'.repeat(256)
    const nameOrError = SpecialName.create(longName)

    expect(nameOrError).toEqual(left(new InvalidNameError(longName)))
  })

  it('Should not create a number name', () => {
    const nameOrError = SpecialName.create('123')

    expect(nameOrError).toEqual(left(new InvalidNameError('123')))
  })

  it('Should not create an empty name', () => {
    const nameOrError = SpecialName.create('    ')

    expect(nameOrError).toEqual(left(new InvalidNameError('    ')))
  })
})
