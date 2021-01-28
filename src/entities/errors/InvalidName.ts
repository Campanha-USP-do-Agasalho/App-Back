import { EntityError } from './EntityError'

export class InvalidNameError extends Error implements EntityError {
  constructor(name: string) {
    super(`The name "${name}" is invalid`)
    this.name = 'InvalidNameError'
  }
}
