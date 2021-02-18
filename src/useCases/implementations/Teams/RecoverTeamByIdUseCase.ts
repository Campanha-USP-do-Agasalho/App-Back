import { TeamNotFoundError } from '@useCases/errors'
import {
  RecoverTeamById,
  RecoverTeamByIdPossibleErrors,
  RecoverTeamByIdProps,
  RecoverTeamByIdSuccessResponse,
  RecoverTeamByIdTeamsRepository
} from '@useCases/ports/Teams/RecoverTeamById'

import { Either, left, right } from '@shared/Either'

export class RecoverTeamByIdUseCase implements RecoverTeamById {
  constructor(
    private readonly teamsRepository: RecoverTeamByIdTeamsRepository
  ) {}

  async execute(
    props: RecoverTeamByIdProps
  ): Promise<
    Either<RecoverTeamByIdPossibleErrors, RecoverTeamByIdSuccessResponse>
  > {
    const recoverTeamByIdOrError = await this.teamsRepository.recoverTeamById(
      props.teamId
    )
    if (recoverTeamByIdOrError.isLeft()) {
      return left(recoverTeamByIdOrError.value)
    }
    const recoverTeamById = recoverTeamByIdOrError.value
    if (!recoverTeamById) {
      return left(new TeamNotFoundError(props.teamId))
    }
    return right(recoverTeamById)
  }
}
