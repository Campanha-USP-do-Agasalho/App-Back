import { EntityError } from './EntityError'

export class InvalidScheduleError extends Error implements EntityError {
  constructor(schedule: string) {
    super(`The date "${schedule}" is invalid`)
    this.name = 'InvalidDateError'
  }
}
