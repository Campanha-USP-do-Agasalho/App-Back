import { TeamProps } from '@entities'

export class TeamBuilder {
  private team: TeamProps = {
    fullName: 'MiojãoBobao',
    name: 'Miojão',
    id: 'miojao.bobao'
  }

  static aTeam = (): TeamBuilder => {
    return new TeamBuilder()
  }

  public withNotRegisteredId = (): TeamBuilder => {
    this.team.id = 'a'
    return this
  }

  public build = (): TeamProps => {
    return this.team
  }
}
