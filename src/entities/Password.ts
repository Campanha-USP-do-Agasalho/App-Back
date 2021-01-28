import { InvalidPasswordError } from '@entities/errors'

import { Either, left, right } from '@shared/Either'

export class Password {
  private password: string

  private constructor(password: string) {
    this.password = password
  }

  get value() {
    return this.password
  }

  public static create(
    password: string
  ): Either<InvalidPasswordError, Password> {
    if (!this.validate(password))
      return left(new InvalidPasswordError(password))

    return right(new Password(password.trim()))
  }

  public static validate(password: string) {
    if (password.trim().length < 8 || password.trim().length > 255) return false
    return true
  }
}
