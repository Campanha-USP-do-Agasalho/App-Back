import { HttpRequest } from '@adapters/presentation/contracts'
import { MissingParamError } from '@adapters/presentation/controllers/errors'
import { TeamToUpdateViewModel } from '@adapters/presentation/controllers/Teams/viewmodels'
import * as Yup from 'yup'

import { Either, left, right } from '@shared'

export class TeamToUpdateValidator {
  static validate(
    request: HttpRequest<TeamToUpdateViewModel>
  ): Either<MissingParamError, TeamToUpdateViewModel> {
    const schema = Yup.object().shape({
      name: Yup.string().optional(),
      fullName: Yup.string().optional()
    })

    try {
      const obj = schema.validateSync(request.body)
      return right(obj)
    } catch (error) {
      const yupError = error as Yup.ValidationError
      return left(new MissingParamError(yupError.errors[0]))
    }
  }
}
