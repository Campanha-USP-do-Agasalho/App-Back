import { UseCaseError } from './UseCaseError'

export class UnauthorizedError extends Error implements UseCaseError {
  constructor() {
    super('The user has no permission to do this action')
    this.name = 'UnauthorizedError'
  }
}
