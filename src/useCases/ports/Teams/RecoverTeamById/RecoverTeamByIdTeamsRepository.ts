import { TeamProps } from '@entities'

import { ConnectionError } from '@useCases/errors'

import { Either } from '@shared/Either'

export interface RecoverTeamByIdTeamsRepository {
  recoverTeamById: (
    teamId: string
  ) => Promise<Either<ConnectionError, TeamProps | null>>
}
