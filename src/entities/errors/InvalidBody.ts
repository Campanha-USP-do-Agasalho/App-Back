import { EntityError } from './EntityError'

export class InvalidBodyError extends Error implements EntityError {
  constructor(name: string) {
    super(`The body "${name}" is invalid`)
    this.name = 'InvalidBodyError'
  }
}
