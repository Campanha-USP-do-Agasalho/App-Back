import { TeamProps } from '@entities'
import { EntityError } from '@entities/errors'

import { UseCase } from '@useCases/contracts'
import {
  ConnectionError,
  TeamNotFoundError,
  UnauthorizedError
} from '@useCases/errors'

export type UpdateTeamProps = {
  userFromRequest: {
    id: string
    role: number
  }
  teamId: string
  teamProps: Partial<Omit<TeamProps, 'id'>>
}

export type UpdateTeamPossibleErrors =
  | ConnectionError
  | UnauthorizedError
  | TeamNotFoundError
  | EntityError

export type UpdateTeamSuccessResponse = TeamProps

export type UpdateTeam = UseCase<
  UpdateTeamProps,
  UpdateTeamPossibleErrors,
  UpdateTeamSuccessResponse
>
