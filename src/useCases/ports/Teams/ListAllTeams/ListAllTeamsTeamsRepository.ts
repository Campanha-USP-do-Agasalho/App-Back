import { TeamProps } from '@entities'

import { ConnectionError } from '@useCases/errors'

import { Either, WithId } from '@shared'

export interface ListAllTeamsTeamsRepository {
  listAllTeams: () => Promise<Either<ConnectionError, WithId<TeamProps>[]>>
}
