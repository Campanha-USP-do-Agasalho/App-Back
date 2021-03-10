import { TeamProps } from '@entities'

import { ConnectionError } from '@useCases/errors'

import { Either, WithId } from '@shared'

export interface UpdateTeamTeamsRepository {
  recoverTeamById: (
    teamId: string
  ) => Promise<Either<ConnectionError, WithId<TeamProps> | null>>

  updateTeam: (
    teamId: string,
    teamProps: Partial<TeamProps>
  ) => Promise<Either<ConnectionError, null>>
}
