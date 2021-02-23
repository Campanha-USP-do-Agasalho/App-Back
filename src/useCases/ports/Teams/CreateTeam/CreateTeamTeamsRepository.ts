import { TeamProps } from '@entities'

import { ConnectionError } from '@useCases/errors'

import { Either } from '@shared/Either'

export interface CreateTeamTeamsRepository {
  createTeam: (
    teamProps: TeamProps
  ) => Promise<Either<ConnectionError, TeamProps>>
}
