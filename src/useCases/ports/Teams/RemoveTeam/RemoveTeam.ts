import { UserFromRequestProps } from '@entities'

import { UseCase } from '@useCases/contracts'
import { ConnectionError, UnauthorizedError } from '@useCases/errors'

export type RemoveTeamProps = {
  userFromRequest: UserFromRequestProps
  teamId: string
}

export type RemoveTeamPossibleErrors = ConnectionError | UnauthorizedError

export type RemoveTeamSuccessResponse = null

export type RemoveTeam = UseCase<
  RemoveTeamProps,
  RemoveTeamPossibleErrors,
  RemoveTeamSuccessResponse
>
