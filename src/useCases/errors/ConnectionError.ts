import { UseCaseError } from './UseCaseError'

export class ConnectionError extends Error implements UseCaseError {
  constructor(service: string) {
    super(`Connection with ${service} has failed`)
    this.name = 'ConnectionError'
  }
}
