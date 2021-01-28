import { InvalidNameError } from '@entities/errors'

import { Either, left, right } from '@shared/Either'

export class Name {
  private name: string

  private constructor(name: string) {
    this.name = name
  }

  get value() {
    return this.name
  }

  public static create(name: string): Either<InvalidNameError, Name> {
    if (!this.validate(name)) return left(new InvalidNameError(name))

    return right(new Name(name.trim()))
  }

  public static validate(name: string) {
    const tester = /^[_A-zÀ-ÿ]*((-|\s)*[_A-zÀ-ÿ])*$/g

    if (name.trim().length < 2 || name.trim().length > 255) return false
    if (!isNaN(+name)) return false
    if (!tester.test(name.trim())) return false
    return true
  }
}
