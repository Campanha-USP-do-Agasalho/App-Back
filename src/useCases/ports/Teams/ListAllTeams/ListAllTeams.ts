import { TeamProps } from '@entities'

import { UseCase } from '@useCases/contracts'
import { ConnectionError, UnauthorizedError } from '@useCases/errors'

export type ListAllTeamsProps = {
  userFromRequest: {
    id: string
    role: number
  }
}

export type ListAllTeamsPossibleErrors = ConnectionError | UnauthorizedError

export type ListAllTeamsSuccessResponse = TeamProps[]

export type ListAllTeams = UseCase<
  ListAllTeamsProps,
  ListAllTeamsPossibleErrors,
  ListAllTeamsSuccessResponse
>
