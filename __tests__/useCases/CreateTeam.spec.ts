import { TeamBuilder, UserFromRequestBuilder } from '@builders'

import { Team, TeamProps } from '@entities'

import { ConnectionError, UnauthorizedError } from '@useCases/errors'
import { CreateTeamUseCase } from '@useCases/implementations/Teams'
import {
  CreateTeam,
  CreateTeamTeamsRepository
} from '@useCases/ports/Teams/CreateTeam'
import {
  RecoverTeamById,
  RecoverTeamByIdTeamsRepository
} from '@useCases/ports/Teams/RecoverTeamById'

import { Either, left, right } from '@shared/Either'

interface ISutType {
  sut: CreateTeam
  teamsRepositoryStub: CreateTeamTeamsRepository
}

const makeTeamsRepositoryStub = (): CreateTeamTeamsRepository => {
  class TeamsRepositoryStub implements CreateTeamTeamsRepository {
    async createTeam(
      teamProps: TeamProps
    ): Promise<Either<ConnectionError, TeamProps>> {
      const team = TeamBuilder.aTeam().build()
      return right(team)
    }
  }
  return new TeamsRepositoryStub()
}

const makeSut = (): ISutType => {
  const teamsRepositoryStub = makeTeamsRepositoryStub()
  const sut = new CreateTeamUseCase(teamsRepositoryStub)

  return { sut, teamsRepositoryStub }
}

describe('Create Team Ue Case', () => {
  it('Should return a valid Team', async () => {
    const { sut } = makeSut()
    const team = TeamBuilder.aTeam().build()
    const response = await sut.execute({
      teamProps: team,
      userFromRequest: UserFromRequestBuilder.aUserFromRequest().build()
    })

    expect(response).toEqual(right(team))
  })

  it('Should not allow users whith Member role to create a team', async () => {
    const { sut } = makeSut()
    const team = TeamBuilder.aTeam().build()
    const response = await sut.execute({
      teamProps: team,
      userFromRequest: UserFromRequestBuilder.aUserFromRequest()
        .asMember()
        .build()
    })

    expect(response).toEqual(left(new UnauthorizedError()))
  })
})
