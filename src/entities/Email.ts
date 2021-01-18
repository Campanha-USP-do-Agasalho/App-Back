import { InvalidEmailError } from '@entities/errors'

import { Either, left, right } from '@shared/Either'

export class Email {
  private email: string

  private constructor(email: string) {
    this.email = email
  }

  get value() {
    return this.email
  }

  public static create(email: string): Either<InvalidEmailError, Email> {
    if (!this.validate(email)) return left(new InvalidEmailError(email))

    return right(new Email(email.trim()))
  }

  static validate(email: string): boolean {
    const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!email) {
      return false
    }
    if (email.length > 256) {
      return false
    }
    if (!tester.test(email)) {
      return false
    }
    const [account, address] = email.split('@')
    if (account.length > 64) {
      return false
    }
    const domainParts = address.split('.')
    if (
      domainParts.some(function (part) {
        return part.length > 63
      })
    ) {
      return false
    }
    return true
  }
}
