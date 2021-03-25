import { TeamProps, UserFromRequestProps } from '@entities'

import { UseCase } from '@useCases/contracts'
import { ConnectionError, UnauthorizedError } from '@useCases/errors'

import { WithId } from '@shared'

export type ListAllTeamsProps = {
  userFromRequest: UserFromRequestProps
}

export type ListAllTeamsPossibleErrors = ConnectionError | UnauthorizedError

export type ListAllTeamsSuccessResponse = WithId<TeamProps>[]

export type ListAllTeams = UseCase<
  ListAllTeamsProps,
  ListAllTeamsPossibleErrors,
  ListAllTeamsSuccessResponse
>
