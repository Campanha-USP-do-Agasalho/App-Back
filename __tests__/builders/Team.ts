import { TeamProps } from '@entities'

export class TeamBuilder {
  private team: TeamProps = {
    fullName: 'MiojãoBobao',
    name: 'Miojão'
  }

  static aTeam = (): TeamBuilder => {
    return new TeamBuilder()
  }

  public withNewInfos = (): TeamBuilder => {
    this.team.name = 'ramen'
    this.team.fullName = 'ramen de linguica e tomate'
    return this
  }

  public withInvalidName = (): TeamBuilder => {
    this.team.name = 'Mioj@o'
    return this
  }

  public build = (): TeamProps => {
    return this.team
  }
}
