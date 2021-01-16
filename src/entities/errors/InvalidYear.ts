import { EntityError } from './EntityError'

export class InvalidYearError extends Error implements EntityError {
  constructor(year: string) {
    super(`The year "${year}" is invalid`)
    this.name = 'InvalidYearError'
  }
}
