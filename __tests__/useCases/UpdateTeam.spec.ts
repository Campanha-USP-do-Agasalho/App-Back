import { TeamBuilder, UserFromRequestBuilder } from '@builders'

import { TeamProps } from '@entities'
import { InvalidNameError } from '@entities/errors'

import {
  ConnectionError,
  TeamNotFoundError,
  UnauthorizedError
} from '@useCases/errors'
import { UpdateTeamUseCase } from '@useCases/implementations/Teams'
import {
  UpdateTeam,
  UpdateTeamTeamsRepository
} from '@useCases/ports/Teams/UpdateTeam'

import { Either, left, right } from '@shared/Either'

interface ISutType {
  sut: UpdateTeam
  teamsRepositoryStub: UpdateTeamTeamsRepository
}

const makeTeamsRepositoryStub = (): UpdateTeamTeamsRepository => {
  class TeamsRepositoryStub implements UpdateTeamTeamsRepository {
    async recoverTeamById(
      teamId: string
    ): Promise<Either<ConnectionError, TeamProps | null>> {
      const team = TeamBuilder.aTeam().build()
      if (teamId === team.id) return right(team)
      return right(null)
    }

    async updateTeam(
      _teamId: string,
      _teamProps: Partial<TeamProps>
    ): Promise<Either<ConnectionError, null>> {
      return right(null)
    }
  }

  return new TeamsRepositoryStub()
}

const makeSut = (): ISutType => {
  const teamsRepositoryStub = makeTeamsRepositoryStub()
  const sut = new UpdateTeamUseCase(teamsRepositoryStub)

  return { sut, teamsRepositoryStub }
}

describe('Update Team Use Case', () => {
  describe('Success Cases', () => {
    it('Should update the team with the new infos passed', async () => {
      const { sut, teamsRepositoryStub } = makeSut()

      const teamsRepositorySpy = jest.spyOn(teamsRepositoryStub, 'updateTeam')

      const teamProps = TeamBuilder.aTeam().withNewInfos().build()

      await sut.execute({
        teamId: teamProps.id,
        teamProps,
        userFromRequest: UserFromRequestBuilder.aUserFromRequest().build()
      })

      expect(teamsRepositorySpy).toBeCalledWith(teamProps.id, teamProps)
    })

    it('Should return the team with new infos', async () => {
      const { sut } = makeSut()

      const teamProps = TeamBuilder.aTeam().withNewInfos().build()

      const response = await sut.execute({
        teamId: teamProps.id,
        teamProps,
        userFromRequest: UserFromRequestBuilder.aUserFromRequest().build()
      })

      expect(response).toEqual(right(teamProps))
    })
  })

  describe('Permission Verification', () => {
    it('Should allow users with COORD role to access this use case', async () => {
      const { sut } = makeSut()

      const teamProps = TeamBuilder.aTeam().withNewInfos().build()

      const response = await sut.execute({
        teamId: teamProps.id,
        teamProps,
        userFromRequest: UserFromRequestBuilder.aUserFromRequest()
          .asCoord()
          .build()
      })

      expect(response.isRight()).toBeTruthy()
    })

    it('Should not allow users with less access than COORD to access this use case', async () => {
      const { sut } = makeSut()

      const teamProps = TeamBuilder.aTeam().withNewInfos().build()

      const response = await sut.execute({
        teamId: teamProps.id,
        teamProps,
        userFromRequest: UserFromRequestBuilder.aUserFromRequest()
          .asMember()
          .build()
      })

      expect(response).toEqual(left(new UnauthorizedError()))
    })
  })

  describe('User Error Cases', () => {
    it('Should return a not found error if there is no team registered with given id', async () => {
      const { sut } = makeSut()

      const teamProps = TeamBuilder.aTeam()
        .withNewInfos()
        .withNotRegisteredId()
        .build()

      const response = await sut.execute({
        teamId: teamProps.id,
        teamProps,
        userFromRequest: UserFromRequestBuilder.aUserFromRequest().build()
      })

      expect(response).toEqual(left(new TeamNotFoundError(teamProps.id)))
    })

    it('Should return an entity error if some team info is invalid', async () => {
      const { sut } = makeSut()

      const teamProps = TeamBuilder.aTeam()
        .withNewInfos()
        .withInvalidName()
        .build()

      const response = await sut.execute({
        teamId: teamProps.id,
        teamProps,
        userFromRequest: UserFromRequestBuilder.aUserFromRequest().build()
      })

      expect(response).toEqual(left(new InvalidNameError(teamProps.name)))
    })
  })

  describe('Server Error Cases', () => {
    it('Should return a connection error if connection to teams repository fails', async () => {
      const { sut, teamsRepositoryStub } = makeSut()

      jest
        .spyOn(teamsRepositoryStub, 'recoverTeamById')
        .mockImplementation(async () => {
          return left(new ConnectionError('Teams Repository'))
        })

      const teamProps = TeamBuilder.aTeam().withNewInfos().build()

      const response = await sut.execute({
        teamId: teamProps.id,
        teamProps,
        userFromRequest: UserFromRequestBuilder.aUserFromRequest().build()
      })

      expect(response).toEqual(left(new ConnectionError('Teams Repository')))
    })
  })
})
