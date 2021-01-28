import { EntityError } from './EntityError'

export class InvalidSemesterError extends Error implements EntityError {
  constructor(semester: string) {
    super(`The semester "${semester}" is invalid`)
    this.name = 'InvalidSemesterError'
  }
}
