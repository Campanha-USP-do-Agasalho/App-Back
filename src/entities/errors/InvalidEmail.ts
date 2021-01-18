import { EntityError } from './EntityError'

export class InvalidEmailError extends Error implements EntityError {
  constructor(name: string) {
    super(`The email "${name}" is invalid`)
    this.name = 'InvalidEmailError'
  }
}