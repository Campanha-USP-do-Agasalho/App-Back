import { TeamProps } from '@entities'

import { ConnectionError } from '@useCases/errors'

import { Either, WithId } from '@shared'

export interface CreateTeamTeamsRepository {
  createTeam: (
    teamProps: WithId<TeamProps>
  ) => Promise<Either<ConnectionError, WithId<TeamProps>>>
}
