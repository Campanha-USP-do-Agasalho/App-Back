import { ConnectionError } from '@useCases/errors'

import { Either } from '@shared'

export interface RemoveTeamTeamsRepository {
  removeTeam: (teamId: string) => Promise<Either<ConnectionError, null>>
}
