import {
  ControllerWithDecoding,
  DecodedHttpRequest,
  HttpResponse
} from '@adapters/presentation/contracts'
import {
  missingError,
  notAcceptableError,
  notFoundError,
  permissionError,
  serverError,
  success
} from '@adapters/presentation/controllers/helpers'
import { TeamToUpdateValidator } from '@adapters/presentation/controllers/Teams/validators'
import {
  TeamToUpdateViewModel,
  TeamViewModel
} from '@adapters/presentation/controllers/Teams/viewmodels'
import { ErrorViewModel } from '@adapters/presentation/controllers/viewmodels'

import {
  ConnectionError,
  TeamNotFoundError,
  UnauthorizedError
} from '@useCases/errors'
import { UpdateTeam } from '@useCases/ports/Teams/UpdateTeam'

export class UpdateTeamController implements ControllerWithDecoding {
  constructor(private readonly updateTeam: UpdateTeam) {}

  async handle(
    request: DecodedHttpRequest<TeamToUpdateViewModel, unknown, { id: string }>
  ): Promise<HttpResponse<ErrorViewModel | TeamViewModel>> {
    const validatedInputOrError = TeamToUpdateValidator.validate(request)
    if (validatedInputOrError.isLeft()) {
      return missingError(validatedInputOrError.value.message)
    }
    const validatedInput = validatedInputOrError.value

    try {
      const response = await this.updateTeam.execute({
        userFromRequest: request.user,
        teamId: request.params.id,
        teamProps: validatedInput
      })

      if (response.isRight()) {
        return success(response.value)
      }

      if (response.value instanceof ConnectionError) {
        return serverError(response.value.message)
      }

      if (response.value instanceof UnauthorizedError) {
        return permissionError()
      }

      if (response.value instanceof TeamNotFoundError) {
        return notFoundError(response.value.message)
      }

      return notAcceptableError(response.value.message)
    } catch (error) {
      return serverError(error.message)
    }
  }
}
