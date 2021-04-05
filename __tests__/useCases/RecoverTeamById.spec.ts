import { TeamWithIdBuilder } from '@builders'

import { TeamProps } from '@entities'

import { ConnectionError, TeamNotFoundError } from '@useCases/errors'
import { RecoverTeamByIdUseCase } from '@useCases/implementations/Teams'
import {
  RecoverTeamById,
  RecoverTeamByIdTeamsRepository
} from '@useCases/ports/Teams/RecoverTeamById'

import { Either, left, right, WithId } from '@shared'

interface ISutType {
  sut: RecoverTeamById
  teamsRepositoryStub: RecoverTeamByIdTeamsRepository
}

const makeTeamsRepositoryStub = (): RecoverTeamByIdTeamsRepository => {
  class TeamsRepositoryStub implements RecoverTeamByIdTeamsRepository {
    async recoverTeamById(
      teamId: string
    ): Promise<Either<ConnectionError, WithId<TeamProps> | null>> {
      const team = TeamWithIdBuilder.aTeam().build()
      if (teamId === team.id) {
        return right(team)
      }
      return right(null)
    }
  }
  return new TeamsRepositoryStub()
}

const makeSut = (): ISutType => {
  const teamsRepositoryStub = makeTeamsRepositoryStub()
  const sut = new RecoverTeamByIdUseCase(teamsRepositoryStub)

  return { sut, teamsRepositoryStub }
}

describe('Recover Team By Id Use Case', () => {
  it('Should return a valid team with the requested id', async () => {
    const { sut } = makeSut()
    const team = TeamWithIdBuilder.aTeam().build()
    const response = await sut.execute({
      teamId: team.id
    })

    expect(response).toEqual(right(team))
  })

  it('Should reaturn a team not found if there is no team with the requested id', async () => {
    const { sut } = makeSut()
    const team = TeamWithIdBuilder.aTeam().withNotRegisteredId().build()
    const response = await sut.execute({
      teamId: team.id
    })

    expect(response).toEqual(left(new TeamNotFoundError(team.id)))
  })

  it('Should return a connection error if connection to teams repository fails', async () => {
    const { sut, teamsRepositoryStub } = makeSut()

    jest
      .spyOn(teamsRepositoryStub, 'recoverTeamById')
      .mockImplementation(async () => {
        return left(new ConnectionError('Teams Repository'))
      })

    const team = TeamWithIdBuilder.aTeam().build()
    const response = await sut.execute({
      teamId: team.id
    })

    expect(response).toEqual(left(new ConnectionError('Teams Repository')))
  })
})
