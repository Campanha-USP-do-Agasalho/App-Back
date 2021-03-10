import { TeamProps } from '@entities'

import { ConnectionError } from '@useCases/errors'

import { Either, WithId } from '@shared'

export interface RecoverTeamByIdTeamsRepository {
  recoverTeamById: (
    teamId: string
  ) => Promise<Either<ConnectionError, WithId<TeamProps> | null>>
}
