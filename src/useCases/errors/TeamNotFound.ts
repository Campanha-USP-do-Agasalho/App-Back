import { UseCaseError } from './UseCaseError'

export class TeamNotFoundError extends Error implements UseCaseError {
  constructor(id: string) {
    super(`The team ${id} was not found`)
    this.name = 'TeamNotFoundError'
  }
}
