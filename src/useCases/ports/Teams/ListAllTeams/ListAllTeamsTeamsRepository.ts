import { TeamProps } from '@entities'

import { ConnectionError } from '@useCases/errors'

import { Either } from '@shared/Either'

export interface ListAllTeamsTeamsRepository {
  listAllTeams: () => Promise<Either<ConnectionError, TeamProps[]>>
}
