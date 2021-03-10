import { TeamProps } from '@entities'

import { WithId } from '@shared'

export class TeamWithIdBuilder {
  private team: WithId<TeamProps> = {
    fullName: 'MiojãoBobao',
    name: 'Miojão',
    id: 'miojão'
  }

  static aTeam = (): TeamWithIdBuilder => {
    return new TeamWithIdBuilder()
  }

  public withNotRegisteredId = (): TeamWithIdBuilder => {
    this.team.id = 'klaus'
    return this
  }

  public withNewInfos = (): TeamWithIdBuilder => {
    this.team.name = 'ramen'
    this.team.fullName = 'ramen de linguica e tomate'
    return this
  }

  public withInvalidName = (): TeamWithIdBuilder => {
    this.team.name = 'Mioj@o'
    return this
  }

  public build = (): WithId<TeamProps> => {
    return this.team
  }
}
