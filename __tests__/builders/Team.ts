import { TeamProps } from '@entities'

export class TeamBuilder {
  private team: TeamProps = {
    fullName: 'MiojãoBobao',
    name: 'Miojão'
  }

  static aTeam = (): TeamBuilder => {
    return new TeamBuilder()
  }

  public build = (): TeamProps => {
    return this.team
  }
}
