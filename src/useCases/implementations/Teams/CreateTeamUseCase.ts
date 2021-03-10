import { ROLE } from '@entities'

import { UnauthorizedError } from '@useCases/errors'
import { IIdManager } from '@useCases/ports/external/utils'
import {
  CreateTeam,
  CreateTeamPossibleErrors,
  CreateTeamProps,
  CreateTeamSuccessResponse,
  CreateTeamTeamsRepository
} from '@useCases/ports/Teams/CreateTeam'

import { Either, left, right, Permissions } from '@shared'

export class CreateTeamUseCase implements CreateTeam {
  constructor(
    private readonly teamsRepository: CreateTeamTeamsRepository,
    private readonly idManager: IIdManager
  ) {}

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

    const teamId = await this.idManager.generate(props.teamProps.name)

    const createTeamOrError = await this.teamsRepository.createTeam({
      ...props.teamProps,
      id: teamId
    })
    if (createTeamOrError.isLeft()) {
      return left(createTeamOrError.value)
    }
    const createTeam = createTeamOrError.value

    return right(createTeam)
  }
}
