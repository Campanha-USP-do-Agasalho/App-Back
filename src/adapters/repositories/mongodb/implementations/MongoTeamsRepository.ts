import { ITeamsRepository } from '@adapters/repositories/ports'

import { TeamProps } from '@entities'

import { ConnectionError } from '@useCases/errors'

import { WithId, Either, left, right } from '@shared'

import { TeamMapper } from '../mappers'
import { TeamModel } from '../schemas'
import { MongoRepository } from './MongoRepository'

export class MongoTeamsRepository
  extends MongoRepository
  implements ITeamsRepository {
  collection = TeamModel.collection.name

  async clearCollection(): Promise<void> {
    await TeamModel.deleteMany()
  }

  async createTeam(
    teamProps: WithId<TeamProps>
  ): Promise<Either<ConnectionError, WithId<TeamProps>>> {}

  async listAllTeams(): Promise<Either<ConnectionError, WithId<TeamProps>[]>> {
    try {
      const docs = await TeamModel.find().lean()
      return right(TeamMapper.mapCollection(docs))
    } catch (error) {
      return left(new ConnectionError(this.collection))
    }
  }

  async recoverTeamById(
    teamId: string
  ): Promise<Either<ConnectionError, WithId<TeamProps> | null>> {}

  async removeTeam(teamId: string): Promise<Either<ConnectionError, null>> {}

  async updateTeam(
    teamId: string,
    teamProps: Partial<TeamProps>
  ): Promise<Either<ConnectionError, null>> {}
}
