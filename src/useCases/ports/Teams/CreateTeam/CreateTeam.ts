import { TeamProps, UserFromRequestProps } from '@entities'

import { UseCase } from '@useCases/contracts'
import { ConnectionError, UnauthorizedError } from '@useCases/errors'

export type CreateTeamProps = {
  userFromRequest: UserFromRequestProps
  teamProps: TeamProps
}

export type CreateTeamPossibleErrors = ConnectionError | UnauthorizedError

export type CreateTeamSuccessResponse = TeamProps

export type CreateTeam = UseCase<
  CreateTeamProps,
  CreateTeamPossibleErrors,
  CreateTeamSuccessResponse
>
