import { TeamProps } from '@entities'

import { UseCase } from '@useCases/contracts'
import {
  ConnectionError,
  TeamNotFoundError,
  UnauthorizedError
} from '@useCases/errors'

export type RecoverTeamByIdProps = {
  userFromRequest: {
    id: string
    role: number
  }
  teamId: string
}

export type RecoverTeamByIdPossibleErrors =
  | ConnectionError
  | UnauthorizedError
  | TeamNotFoundError

export type RecoverTeamByIdSuccessResponse = TeamProps

export type RecoverTeamById = UseCase<
  RecoverTeamByIdProps,
  RecoverTeamByIdPossibleErrors,
  RecoverTeamByIdSuccessResponse
>
