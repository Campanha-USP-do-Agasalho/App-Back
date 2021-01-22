import { EntityError } from './EntityError'

export class InvalidDateError extends Error implements EntityError {
  constructor(date: string) {
    super(`The date "${date}" is invalid`)
    this.name = 'InvalidDateError'
  }
}
