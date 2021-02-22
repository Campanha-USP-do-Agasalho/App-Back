import { TeamProps } from '@entities'

import { ConnectionError } from '@useCases/errors'

import { Either } from '@shared/Either'

export interface UpdateTeamTeamsRepository {
  recoverTeamById: (
    teamId: string
  ) => Promise<Either<ConnectionError, TeamProps | null>>

  updateTeam: (
    teamId: string,
    teamProps: Partial<TeamProps>
  ) => Promise<Either<ConnectionError, null>>
}
