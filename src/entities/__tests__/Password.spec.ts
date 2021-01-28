import { Password } from '@entities'
import { InvalidPasswordError } from '@entities/errors'

import { left } from '@shared/Either'

describe('Password Entity', () => {
  it('Should create a new valid password and trim', () => {
    const passwordOrError = Password.create('123456789')

    expect(passwordOrError.isRight()).toBeTruthy()
    expect((<Password>passwordOrError.value).value).toBe('123456789')
  })

  it('Should allow password with space between words', () => {
    const passwordOrError = Password.create('Palavra pavrala laarvap Senhá@')

    expect(passwordOrError.isRight()).toBeTruthy()
    expect((<Password>passwordOrError.value).value).toBe(
      'Palavra pavrala laarvap Senhá@'
    )
  })

  it('Should not create a short passoword (-8)', () => {
    const passwordOrError = Password.create('A')

    expect(passwordOrError).toEqual(left(new InvalidPasswordError('A')))
  })

  it('Should not create a long password (+255)', () => {
    const longpassword = 'A'.repeat(256)
    const passwordOrError = Password.create(longpassword)

    expect(passwordOrError).toEqual(
      left(new InvalidPasswordError(longpassword))
    )
  })

  it('Should not create an empty password', () => {
    const passwordOrError = Password.create('    ')

    expect(passwordOrError).toEqual(left(new InvalidPasswordError('    ')))
  })
})
