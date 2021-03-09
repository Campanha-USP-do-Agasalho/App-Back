import { ROLE } from '@entities'

import { UnauthorizedError } from '@useCases/errors'
import {
  CreateTeam,
  CreateTeamPossibleErrors,
  CreateTeamProps,
  CreateTeamSuccessResponse,
  CreateTeamTeamsRepository
} from '@useCases/ports/Teams/CreateTeam'

import { Either, left, right } from '@shared/Either'
import { Permissions } from '@shared/Permissions'

export class CreateTeamUseCase implements CreateTeam {
  constructor(private readonly teamsRepository: CreateTeamTeamsRepository) {}

  async execute(
    props: CreateTeamProps
  ): Promise<Either<CreateTeamPossibleErrors, CreateTeamSuccessResponse>> {
    if (
      !Permissions.verifyPermissionOnRole(
        props.userFromRequest.role,
        ROLE.COORD
      )
    ) {
      return left(new UnauthorizedError())
    }
    const createTeamOrError = await this.teamsRepository.createTeam(
      props.teamProps
    )
    if (createTeamOrError.isLeft()) {
      return left(createTeamOrError.value)
    }
    const createTeam = createTeamOrError.value

    return right(createTeam)
  }
}
