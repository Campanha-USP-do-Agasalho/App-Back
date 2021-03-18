import { TeamDocument } from '@adapters/repositories/mongodb/schemas'
import { LeanDocument } from 'mongoose'

import { TeamProps } from '@entities'

import { WithId } from '@shared'

export class TeamMapper {
  static mapToDocument(entity: WithId<TeamProps>): LeanDocument<TeamDocument> {
    return {
      _id: entity.id,
      name: entity.name,
      fullName: entity.fullName
    }
  }

  static map(entity: LeanDocument<TeamDocument>): WithId<TeamProps> {
    return {
      id: entity._id,
      name: entity.name,
      fullName: entity.fullName
    }
  }

  static mapCollection(
    entities: LeanDocument<TeamDocument>[]
  ): WithId<TeamProps>[] {
    return entities.map(TeamMapper.map)
  }
}
