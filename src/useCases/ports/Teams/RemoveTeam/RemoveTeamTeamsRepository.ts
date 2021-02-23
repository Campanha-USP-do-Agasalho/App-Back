import { ConnectionError } from '@useCases/errors'

import { Either } from '@shared/Either'

export interface RemoveTeamTeamsRepository {
  removeTeam: (teamId: string) => Promise<Either<ConnectionError, null>>
}
