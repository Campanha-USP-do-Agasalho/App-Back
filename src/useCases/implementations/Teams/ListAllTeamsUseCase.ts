import { ROLE } from '@entities'

import { UnauthorizedError } from '@useCases/errors'
import {
  ListAllTeams,
  ListAllTeamsPossibleErrors,
  ListAllTeamsProps,
  ListAllTeamsSuccessResponse,
  ListAllTeamsTeamsRepository
} from '@useCases/ports/Teams/ListAllTeams'

import { Either, left, right } from '@shared/Either'
import { Permissions } from '@shared/Permissions'

export class ListAllTeamsUseCase implements ListAllTeams {
  constructor(private readonly teamsrepository: ListAllTeamsTeamsRepository) {}

  async execute(
    props: ListAllTeamsProps
  ): Promise<Either<ListAllTeamsPossibleErrors, ListAllTeamsSuccessResponse>> {
    if (
      !Permissions.verifyPermissionOnRole(
        props.userFromRequest.role,
        ROLE.COORD
      )
    ) {
      return left(new UnauthorizedError())
    }

    const teamsListOrError = await this.teamsrepository.listAllTeams()
    if (teamsListOrError.isLeft()) {
      return left(teamsListOrError.value)
    }
    const teamsList = teamsListOrError.value

    return right(teamsList)
  }
}
