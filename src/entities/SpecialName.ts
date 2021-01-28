import { InvalidNameError } from '@entities/errors'

import { Either, left, right } from '@shared/Either'

export class SpecialName {
  private name: string

  private constructor(name: string) {
    this.name = name
  }

  get value() {
    return this.name
  }

  public static create(name: string): Either<InvalidNameError, SpecialName> {
    if (!this.validate(name)) return left(new InvalidNameError(name))

    return right(new SpecialName(name.trim()))
  }

  public static validate(name: string) {
    const tester = /^[a-zA-Z0-9À-ÿ!@#$&:()\-`.+,/\\"\s]*$/g

    if (name.trim().length < 2 || name.trim().length > 255) return false
    if (!isNaN(+name)) return false
    if (!tester.test(name.trim())) return false
    return true
  }
}
