import { ROLE, Team, TeamProps } from '@entities'

import { TeamNotFoundError, UnauthorizedError } from '@useCases/errors'
import {
  UpdateTeam,
  UpdateTeamPossibleErrors,
  UpdateTeamProps,
  UpdateTeamTeamsRepository
} from '@useCases/ports/Teams/UpdateTeam'

import { Permissions, WithId, Either, left, right } from '@shared'

export class UpdateTeamUseCase implements UpdateTeam {
  constructor(private readonly teamsRepository: UpdateTeamTeamsRepository) {}

  async execute(
    props: UpdateTeamProps
  ): Promise<Either<UpdateTeamPossibleErrors, WithId<TeamProps>>> {
    if (
      !Permissions.verifyPermissionOnRole(
        props.userFromRequest.role,
        ROLE.COORD
      )
    ) {
      return left(new UnauthorizedError())
    }

    const teamPropsOrError = await this.teamsRepository.recoverTeamById(
      props.teamId
    )
    if (teamPropsOrError.isLeft()) return left(teamPropsOrError.value)
    const teamProps = teamPropsOrError.value

    if (!teamProps) return left(new TeamNotFoundError(props.teamId))

    Object.assign(teamProps, props.teamProps)

    const teamOrError = Team.create(teamProps)
    if (teamOrError.isLeft()) return left(teamOrError.value)
    const team = teamOrError.value.value

    const response = await this.teamsRepository.updateTeam(props.teamId, team)
    if (response.isLeft()) return left(response.value)

    return right({ ...team, id: props.teamId })
  }
}
