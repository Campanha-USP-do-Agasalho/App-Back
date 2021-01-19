import { EntityError } from './EntityError'

export class InvalidPasswordError extends Error implements EntityError {
  constructor(name: string) {
    super(`The password "${name}" is invalid`)
    this.name = 'InvalidPasswordError'
  }
}
