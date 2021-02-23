import { TeamBuilder, UserFromRequestBuilder } from '@builders'

import { ConnectionError, UnauthorizedError } from '@useCases/errors'
import { RemoveTeamUseCase } from '@useCases/implementations/Teams'
import {
  RemoveTeam,
  RemoveTeamTeamsRepository
} from '@useCases/ports/Teams/RemoveTeam'

import { Either, left, right } from '@shared/Either'

interface ISutType {
  sut: RemoveTeam
  teamsRepositoryStub: RemoveTeamTeamsRepository
}

const makeTeamsRepositoryStub = (): RemoveTeamTeamsRepository => {
  class TeamsRepositoryStub implements RemoveTeamTeamsRepository {
    async removeTeam(_teamId: string): Promise<Either<ConnectionError, null>> {
      return right(null)
    }
  }

  return new TeamsRepositoryStub()
}

const makeSut = (): ISutType => {
  const teamsRepositoryStub = makeTeamsRepositoryStub()
  const sut = new RemoveTeamUseCase(teamsRepositoryStub)

  return { sut, teamsRepositoryStub }
}

describe('Remove Teams Use Case', () => {
  describe('Success Cases', () => {
    it('Should remove the team with given id from repository', async () => {
      const { sut, teamsRepositoryStub } = makeSut()

      const teamsRepositorySpy = jest.spyOn(teamsRepositoryStub, 'removeTeam')
      const team = TeamBuilder.aTeam().build()

      await sut.execute({
        teamId: team.id,
        userFromRequest: UserFromRequestBuilder.aUserFromRequest().build()
      })

      expect(teamsRepositorySpy).toBeCalledWith(team.id)
    })

    it('Should succeed even if the id is not registered', async () => {
      const { sut } = makeSut()

      const team = TeamBuilder.aTeam().withNotRegisteredId().build()

      const response = await sut.execute({
        teamId: team.id,
        userFromRequest: UserFromRequestBuilder.aUserFromRequest().build()
      })

      expect(response.isRight()).toBeTruthy()
    })
  })

  describe('Permission Verification', () => {
    it('Should allow users with COORD role to access this use case', async () => {
      const { sut } = makeSut()

      const teamProps = TeamBuilder.aTeam().build()

      const response = await sut.execute({
        teamId: teamProps.id,
        userFromRequest: UserFromRequestBuilder.aUserFromRequest()
          .asCoord()
          .build()
      })

      expect(response.isRight()).toBeTruthy()
    })

    it('Should not allow users with less access than COORD to access this use case', async () => {
      const { sut } = makeSut()

      const teamProps = TeamBuilder.aTeam().build()

      const response = await sut.execute({
        teamId: teamProps.id,
        userFromRequest: UserFromRequestBuilder.aUserFromRequest()
          .asMember()
          .build()
      })

      expect(response).toEqual(left(new UnauthorizedError()))
    })
  })

  describe('Server Error Cases', () => {
    it('Should return a connection error if connection to teams repository fails', async () => {
      const { sut, teamsRepositoryStub } = makeSut()

      jest
        .spyOn(teamsRepositoryStub, 'removeTeam')
        .mockImplementation(async () => {
          return left(new ConnectionError('Teams Repository'))
        })

      const teamProps = TeamBuilder.aTeam().build()

      const response = await sut.execute({
        teamId: teamProps.id,
        userFromRequest: UserFromRequestBuilder.aUserFromRequest().build()
      })

      expect(response).toEqual(left(new ConnectionError('Teams Repository')))
    })
  })
})
