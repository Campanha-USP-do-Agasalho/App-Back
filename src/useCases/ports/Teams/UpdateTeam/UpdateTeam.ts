import { TeamProps } from '@entities'
import { EntityError } from '@entities/errors'

import { UseCase } from '@useCases/contracts'
import {
  ConnectionError,
  TeamNotFoundError,
  UnauthorizedError
} from '@useCases/errors'

import { WithId } from '@shared'

export type UpdateTeamProps = {
  userFromRequest: {
    id: string
    role: number
  }
  teamId: string
  teamProps: Partial<TeamProps>
}

export type UpdateTeamPossibleErrors =
  | ConnectionError
  | UnauthorizedError
  | TeamNotFoundError
  | EntityError

export type UpdateTeamSuccessResponse = WithId<TeamProps>

export type UpdateTeam = UseCase<
  UpdateTeamProps,
  UpdateTeamPossibleErrors,
  UpdateTeamSuccessResponse
>
