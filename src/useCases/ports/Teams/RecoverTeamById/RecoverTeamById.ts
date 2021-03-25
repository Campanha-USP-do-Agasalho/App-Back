import { TeamProps } from '@entities'

import { UseCase } from '@useCases/contracts'
import {
  ConnectionError,
  TeamNotFoundError,
  UnauthorizedError
} from '@useCases/errors'

import { WithId } from '@shared'

export type RecoverTeamByIdProps = {
  teamId: string
}

export type RecoverTeamByIdPossibleErrors =
  | ConnectionError
  | UnauthorizedError
  | TeamNotFoundError

export type RecoverTeamByIdSuccessResponse = WithId<TeamProps>

export type RecoverTeamById = UseCase<
  RecoverTeamByIdProps,
  RecoverTeamByIdPossibleErrors,
  RecoverTeamByIdSuccessResponse
>
