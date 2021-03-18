import { MongoRepository } from '@adapters/repositories/mongodb/implementations/MongoRepository'
import { TeamMapper } from '@adapters/repositories/mongodb/mappers'
import { TeamModel } from '@adapters/repositories/mongodb/schemas'
import { ITeamsRepository } from '@adapters/repositories/ports'

import { TeamProps } from '@entities'

import { ConnectionError } from '@useCases/errors'

import { WithId, Either, left, right } from '@shared'

export class MongoTeamsRepository
  extends MongoRepository
  implements ITeamsRepository {
  collection = TeamModel.collection.name

  async clearCollection(): Promise<void> {
    await TeamModel.deleteMany()
  }

  async createTeam(
    teamProps: WithId<TeamProps>
  ): Promise<Either<ConnectionError, WithId<TeamProps>>> {
    try {
      const docs = await TeamModel.create(teamProps)
      return right(TeamMapper.map(docs))
    } catch (error) {
      return left(new ConnectionError(this.collection))
    }
  }

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
  ): Promise<Either<ConnectionError, WithId<TeamProps> | null>> {
    try {
      const docs = await TeamModel.findById(teamId).lean()
      return right(docs ? TeamMapper.map(docs) : null)
    } catch (error) {
      return left(new ConnectionError(this.collection))
    }
  }

  async removeTeam(teamId: string): Promise<Either<ConnectionError, null>> {
    try {
      await TeamModel.findByIdAndDelete(teamId)
      return right(null)
    } catch (error) {
      return left(new ConnectionError(this.collection))
    }
  }

  async updateTeam(
    teamId: string,
    teamProps: Partial<TeamProps>
  ): Promise<Either<ConnectionError, null>> {
    try {
      await TeamModel.findByIdAndUpdate(teamId, teamProps)
      return right(null)
    } catch (error) {
      return left(new ConnectionError(this.collection))
    }
  }
}
