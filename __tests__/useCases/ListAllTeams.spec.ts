import { UserFromRequestBuilder } from '@builders'

import { TeamProps } from '@entities'

import { ConnectionError, UnauthorizedError } from '@useCases/errors'
import { ListAllTeamsUseCase } from '@useCases/implementations/Teams'
import {
  ListAllTeams,
  ListAllTeamsTeamsRepository
} from '@useCases/ports/Teams/ListAllTeams'

import { Either, left, right } from '@shared/Either'

interface ISutType {
  sut: ListAllTeams
  teamsRepositoryStub: ListAllTeamsTeamsRepository
}

const makeTeamsRepositoryStub = (): ListAllTeamsTeamsRepository => {
  class TeamsRepositoryStub implements ListAllTeamsTeamsRepository {
    async listAllTeams(): Promise<Either<ConnectionError, TeamProps[]>> {
      return right([])
    }
  }

  return new TeamsRepositoryStub()
}

const makeSut = (): ISutType => {
  const teamsRepositoryStub = makeTeamsRepositoryStub()
  const sut = new ListAllTeamsUseCase(teamsRepositoryStub)

  return { sut, teamsRepositoryStub }
}

describe('List All Teams Use Case', () => {
  it('Should list all teams registered in the repository', async () => {
    const { sut, teamsRepositoryStub } = makeSut()

    const teamsRepositorySpy = jest.spyOn(teamsRepositoryStub, 'listAllTeams')

    const response = await sut.execute({
      userFromRequest: UserFromRequestBuilder.aUserFromRequest().build()
    })

    expect(response.isRight()).toBeTruthy()
    expect(teamsRepositorySpy).toBeCalled()
  })

  it('Should allow users with COORD role to access this use case', async () => {
    const { sut } = makeSut()

    const response = await sut.execute({
      userFromRequest: UserFromRequestBuilder.aUserFromRequest()
        .asCoord()
        .build()
    })

    expect(response.isRight()).toBeTruthy()
  })

  it('Should not allow users with less access than COORD to access this use case', async () => {
    const { sut } = makeSut()

    const response = await sut.execute({
      userFromRequest: UserFromRequestBuilder.aUserFromRequest()
        .asMember()
        .build()
    })

    expect(response).toEqual(left(new UnauthorizedError()))
  })

  it('Should return a connection error if connection to teams repository fails', async () => {
    const { sut, teamsRepositoryStub } = makeSut()

    jest
      .spyOn(teamsRepositoryStub, 'listAllTeams')
      .mockImplementation(async () => {
        return left(new ConnectionError('Teams Repository'))
      })

    const response = await sut.execute({
      userFromRequest: UserFromRequestBuilder.aUserFromRequest().build()
    })

    expect(response).toEqual(left(new ConnectionError('Teams Repository')))
  })
})
