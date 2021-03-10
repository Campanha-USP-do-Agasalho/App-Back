import { IdManagerByName } from '@adapters/utils'

import { TeamBuilder, UserFromRequestBuilder } from '@builders'

import { TeamProps } from '@entities'

import { ConnectionError, UnauthorizedError } from '@useCases/errors'
import { CreateTeamUseCase } from '@useCases/implementations/Teams'
import { IIdManager } from '@useCases/ports/external/utils'
import {
  CreateTeam,
  CreateTeamTeamsRepository
} from '@useCases/ports/Teams/CreateTeam'

import { Either, left, right, WithId } from '@shared'

interface ISutType {
  sut: CreateTeam
  teamsRepositoryStub: CreateTeamTeamsRepository
  idManagerStub: IIdManager
}

const makeTeamsRepositoryStub = (): CreateTeamTeamsRepository => {
  class TeamsRepositoryStub implements CreateTeamTeamsRepository {
    async createTeam(
      teamProps: WithId<TeamProps>
    ): Promise<Either<ConnectionError, WithId<TeamProps>>> {
      return right(teamProps)
    }
  }
  return new TeamsRepositoryStub()
}

const makeSut = (): ISutType => {
  const teamsRepositoryStub = makeTeamsRepositoryStub()
  const idManagerStub = new IdManagerByName()
  const sut = new CreateTeamUseCase(teamsRepositoryStub, idManagerStub)

  return { sut, teamsRepositoryStub, idManagerStub }
}

describe('Create Team Use Case', () => {
  it('Should return a valid Team', async () => {
    const { sut, idManagerStub } = makeSut()
    const team = TeamBuilder.aTeam().build()
    const response = await sut.execute({
      teamProps: team,
      userFromRequest: UserFromRequestBuilder.aUserFromRequest().build()
    })

    expect(response).toEqual(
      right({ ...team, id: await idManagerStub.generate(team.name) })
    )
  })

  it('Should not allow users with Member role to create a team', async () => {
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
