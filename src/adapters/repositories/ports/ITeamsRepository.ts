import { CreateTeamTeamsRepository } from '@useCases/ports/Teams/CreateTeam'
import { ListAllTeamsTeamsRepository } from '@useCases/ports/Teams/ListAllTeams'
import { RecoverTeamByIdTeamsRepository } from '@useCases/ports/Teams/RecoverTeamById'
import { RemoveTeamTeamsRepository } from '@useCases/ports/Teams/RemoveTeam'
import { UpdateTeamTeamsRepository } from '@useCases/ports/Teams/UpdateTeam'

export interface ITeamsRepository
  extends CreateTeamTeamsRepository,
    ListAllTeamsTeamsRepository,
    RecoverTeamByIdTeamsRepository,
    RemoveTeamTeamsRepository,
    UpdateTeamTeamsRepository {}
