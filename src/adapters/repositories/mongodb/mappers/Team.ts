import { LeanDocument } from 'mongoose'

import { TeamProps } from '@entities'

import { WithId } from '@shared'

import { TeamDocument } from '../schemas'

export class TeamMapper {
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
