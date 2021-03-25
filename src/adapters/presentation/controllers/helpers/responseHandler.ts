import { HttpResponse } from '@adapters/presentation/contracts'
import { ServerError } from '@adapters/presentation/controllers/errors'
import { ErrorViewModel } from '@adapters/presentation/controllers/viewmodels'

export const errorMessage = (
  error: Error,
  statusCode = 400
): HttpResponse<ErrorViewModel> => ({
  statusCode,
  body: { name: error.name, message: error.message }
})

export const applicationError = (
  reason: string
): HttpResponse<ErrorViewModel> => ({
  statusCode: 400,
  body: { name: 'ApplicationError', message: reason }
})

export const missingError = (
  missingField: string
): HttpResponse<ErrorViewModel> => ({
  statusCode: 400,
  body: { name: 'MissingError', field: missingField }
})

export const unauthorizedError = (): HttpResponse<ErrorViewModel> => ({
  statusCode: 401,
  body: { name: 'UnauthorizedError', message: '' }
})

export const permissionError = (): HttpResponse<ErrorViewModel> => ({
  statusCode: 403,
  body: { name: 'PermissionError', message: '' }
})

export const notFoundError = (
  objectNotFound: string
): HttpResponse<ErrorViewModel> => ({
  statusCode: 404,
  body: { name: 'NotFoundError', object: objectNotFound }
})

export const notAcceptableError = (
  fieldNotAcceptable: string
): HttpResponse<ErrorViewModel> => ({
  statusCode: 406,
  body: { name: 'NotAcceptableError', field: fieldNotAcceptable }
})

export const duplicateError = (
  objectDuplicated: string
): HttpResponse<ErrorViewModel> => ({
  statusCode: 409,
  body: { name: 'DuplicateError', object: objectDuplicated }
})

export const preConditionError = (): HttpResponse<ErrorViewModel> => ({
  statusCode: 412,
  body: { name: 'PreConditionError', message: '' }
})

export const success = <T = unknown>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  body: data
})

export const created = <T = unknown>(data: T): HttpResponse<T> => ({
  statusCode: 201,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const serverError = (reason?: string): HttpResponse<ErrorViewModel> =>
  errorMessage(new ServerError(reason || 'Unexpected error'), 500)
