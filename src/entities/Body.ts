import { InvalidBodyError } from '@entities/errors'

import { Either, left, right } from '@shared/Either'

export class Body {
  private body: string

  private constructor(body: string) {
    this.body = body
  }

  get value() {
    return this.body
  }

  public static create(body: string): Either<InvalidBodyError, Body> {
    if (!this.validate(body)) return left(new InvalidBodyError(body))

    return right(new Body(body.trim()))
  }

  public static validate(name: string) {
    if (name.trim().length < 2 || name.trim().length > 255) return false
    return true
  }
}
