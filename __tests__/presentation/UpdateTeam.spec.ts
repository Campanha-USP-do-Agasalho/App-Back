import { DecodedHttpRequest } from '@adapters/presentation/contracts'
import { UpdateTeamController } from '@adapters/presentation/controllers/Teams/implementations'
import { TeamViewModel } from '@adapters/presentation/controllers/Teams/viewmodels'
import { ErrorViewModel } from '@adapters/presentation/controllers/viewmodels'

import { TeamWithIdBuilder, UserFromRequestBuilder } from '@builders'

import { InvalidNameError } from '@entities/errors'

import {
  ConnectionError,
  TeamNotFoundError,
  UnauthorizedError
} from '@useCases/errors'
import {
  UpdateTeam,
  UpdateTeamPossibleErrors,
  UpdateTeamProps,
  UpdateTeamSuccessResponse
} from '@useCases/ports/Teams/UpdateTeam'

import { Either, left, right } from '@shared'

interface ISutType {
  sut: UpdateTeamController
  updateTeamStub: UpdateTeam
}

const makeUpdateTeamStub = (): UpdateTeam => {
  class UpdateTeamStub implements UpdateTeam {
    async execute(
      _props: UpdateTeamProps
    ): Promise<Either<UpdateTeamPossibleErrors, UpdateTeamSuccessResponse>> {
      return right(TeamWithIdBuilder.aTeam().withNewInfos().build())
    }
  }

  return new UpdateTeamStub()
}

const makeSut = (): ISutType => {
  const updateTeamStub = makeUpdateTeamStub()
  const sut = new UpdateTeamController(updateTeamStub)
  return { sut, updateTeamStub }
}

describe('Update Team Controller', () => {
  describe('Success Cases', () => {
    it('Should return the team with updated infos with a 200 status code', async () => {
      const { sut } = makeSut()

      const updatedInfos = TeamWithIdBuilder.aTeam().withNewInfos().build()

      const httpRequest: DecodedHttpRequest = {
        body: {
          name: updatedInfos.name,
          fullName: updatedInfos.fullName
        },
        query: {},
        params: { id: updatedInfos.id },
        accessToken: 'validToken',
        user: UserFromRequestBuilder.aUserFromRequest().build()
      }

      const httpResponse = await sut.handle(httpRequest)

      expect(httpResponse.statusCode).toBe(200)
      expect(httpResponse.body).toEqual<TeamViewModel>(updatedInfos)
    })
  })

  describe('Error Cases', () => {
    it('Should return 403 if the use case returns a unauthorized error', async () => {
      const { sut, updateTeamStub } = makeSut()

      const updatedInfos = TeamWithIdBuilder.aTeam().withNewInfos().build()

      jest.spyOn(updateTeamStub, 'execute').mockImplementation(async () => {
        return left(new UnauthorizedError())
      })

      const httpRequest: DecodedHttpRequest = {
        body: {
          name: updatedInfos.name,
          fullName: updatedInfos.fullName
        },
        query: {},
        params: { id: updatedInfos.id },
        accessToken: 'validToken',
        user: UserFromRequestBuilder.aUserFromRequest().build()
      }

      const httpResponse = await sut.handle(httpRequest)

      expect(httpResponse.statusCode).toBe(403)
      expect(httpResponse.body).toEqual<ErrorViewModel>({
        name: 'PermissionError',
        message: ''
      })
    })

    it('Should return 404 if the use case returns a team not found error', async () => {
      const { sut, updateTeamStub } = makeSut()

      const updatedInfos = TeamWithIdBuilder.aTeam().withNewInfos().build()

      jest.spyOn(updateTeamStub, 'execute').mockImplementation(async () => {
        return left(new TeamNotFoundError(updatedInfos.id))
      })

      const httpRequest: DecodedHttpRequest = {
        body: {
          name: updatedInfos.name,
          fullName: updatedInfos.fullName
        },
        query: {},
        params: { id: updatedInfos.id },
        accessToken: 'validToken',
        user: UserFromRequestBuilder.aUserFromRequest().build()
      }

      const httpResponse = await sut.handle(httpRequest)

      expect(httpResponse.statusCode).toBe(404)
      expect(httpResponse.body).toEqual<ErrorViewModel>({
        name: 'NotFoundError',
        object: `The team ${updatedInfos.id} was not found`
      })
    })

    it('Should return 406 if the use case returns an entity error', async () => {
      const { sut, updateTeamStub } = makeSut()

      const updatedInfos = TeamWithIdBuilder.aTeam().withNewInfos().build()

      jest.spyOn(updateTeamStub, 'execute').mockImplementation(async () => {
        return left(new InvalidNameError(updatedInfos.fullName))
      })

      const httpRequest: DecodedHttpRequest = {
        body: {
          name: updatedInfos.name,
          fullName: updatedInfos.fullName
        },
        query: {},
        params: { id: updatedInfos.id },
        accessToken: 'validToken',
        user: UserFromRequestBuilder.aUserFromRequest().build()
      }

      const httpResponse = await sut.handle(httpRequest)

      expect(httpResponse.statusCode).toBe(406)
      expect(httpResponse.body).toEqual<ErrorViewModel>({
        name: 'NotAcceptableError',
        field: `The name "${updatedInfos.fullName}" is invalid`
      })
    })
  })

  describe('Server Error Cases', () => {
    it('Should return 500 if the use case returns a connection error', async () => {
      const { sut, updateTeamStub } = makeSut()

      const updatedInfos = TeamWithIdBuilder.aTeam().withNewInfos().build()

      jest.spyOn(updateTeamStub, 'execute').mockImplementation(async () => {
        return left(new ConnectionError('Service'))
      })

      const httpRequest: DecodedHttpRequest = {
        body: {
          name: updatedInfos.name,
          fullName: updatedInfos.fullName
        },
        query: {},
        params: { id: updatedInfos.id },
        accessToken: 'validToken',
        user: UserFromRequestBuilder.aUserFromRequest().build()
      }

      const httpResponse = await sut.handle(httpRequest)

      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body).toEqual<ErrorViewModel>({
        name: 'ServerError',
        message: 'Server error: Connection with Service has failed.'
      })
    })

    it('Should return 500 if the use case throws', async () => {
      const { sut, updateTeamStub } = makeSut()

      const updatedInfos = TeamWithIdBuilder.aTeam().withNewInfos().build()

      jest.spyOn(updateTeamStub, 'execute').mockImplementation(async () => {
        throw new Error()
      })

      const httpRequest: DecodedHttpRequest = {
        body: {
          name: updatedInfos.name,
          fullName: updatedInfos.fullName
        },
        query: {},
        params: { id: updatedInfos.id },
        accessToken: 'validToken',
        user: UserFromRequestBuilder.aUserFromRequest().build()
      }

      const httpResponse = await sut.handle(httpRequest)

      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body).toEqual<ErrorViewModel>({
        name: 'ServerError',
        message: 'Server error: Unexpected error.'
      })
    })

    it('Should return 500 if the use case throws with custom reason', async () => {
      const { sut, updateTeamStub } = makeSut()

      const updatedInfos = TeamWithIdBuilder.aTeam().withNewInfos().build()

      jest.spyOn(updateTeamStub, 'execute').mockImplementation(async () => {
        throw new Error('Error')
      })

      const httpRequest: DecodedHttpRequest = {
        body: {
          name: updatedInfos.name,
          fullName: updatedInfos.fullName
        },
        query: {},
        params: { id: updatedInfos.id },
        accessToken: 'validToken',
        user: UserFromRequestBuilder.aUserFromRequest().build()
      }

      const httpResponse = await sut.handle(httpRequest)

      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body).toEqual<ErrorViewModel>({
        name: 'ServerError',
        message: 'Server error: Error.'
      })
    })
  })
})
