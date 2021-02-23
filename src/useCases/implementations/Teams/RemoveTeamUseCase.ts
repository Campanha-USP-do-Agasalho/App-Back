import { ROLE } from '@entities'

import { UnauthorizedError } from '@useCases/errors'
import {
  RemoveTeam,
  RemoveTeamPossibleErrors,
  RemoveTeamProps,
  RemoveTeamTeamsRepository
} from '@useCases/ports/Teams/RemoveTeam'

import { Either, left } from '@shared/Either'
import { Permissions } from '@shared/Permissions'

export class RemoveTeamUseCase implements RemoveTeam {
  constructor(private readonly teamsRepository: RemoveTeamTeamsRepository) {}

  async execute(
    props: RemoveTeamProps
  ): Promise<Either<RemoveTeamPossibleErrors, null>> {
    if (
      !Permissions.verifyPermissionOnRole(
        props.userFromRequest.role,
        ROLE.COORD
      )
    ) {
      return left(new UnauthorizedError())
    }

    return this.teamsRepository.removeTeam(props.teamId)
  }
}
