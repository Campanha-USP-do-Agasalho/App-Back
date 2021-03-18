import { MongoTeamsRepository } from '@adapters/repositories/mongodb/implementations'

import { TeamWithIdBuilder } from '@builders'

import { TeamProps } from '@entities'

import { WithId } from '@shared'

const MongoTeams = new MongoTeamsRepository()

describe('Mongo Teams Repository', () => {
  afterAll(async () => {
    await MongoTeams.disconnect()
  })

  beforeEach(async () => {
    await MongoTeams.clearCollection()
  })

  describe('Create Team & Recover Team By ID', () => {
    it('Should create a team on the database and recover it by id', async () => {
      const teamToSave = TeamWithIdBuilder.aTeam().build()
      await MongoTeams.createTeam(teamToSave)

      const registeredTeam = (await MongoTeams.recoverTeamById(teamToSave.id))
        .value as WithId<TeamProps>
      expect(registeredTeam).toBeTruthy()
    })
  })

  describe('List All Teams', () => {
    it('Should list all teams registered on the database', async () => {
      const teamsToSave = [
        TeamWithIdBuilder.aTeam().build(),
        TeamWithIdBuilder.aTeam().withNotRegisteredId().withNewInfos().build()
      ]
      await Promise.all(
        teamsToSave.map(teamToSave => MongoTeams.createTeam(teamToSave))
      )

      const teamsList = (await MongoTeams.listAllTeams())
        .value as WithId<TeamProps>[]

      expect(teamsList).toHaveLength(2)
    })
  })

  describe('Remove Team', () => {
    it('Should remove a team on the database by id', async () => {
      const teamsToSave = [
        TeamWithIdBuilder.aTeam().build(),
        TeamWithIdBuilder.aTeam().withNotRegisteredId().withNewInfos().build()
      ]
      await Promise.all(
        teamsToSave.map(teamToSave => MongoTeams.createTeam(teamToSave))
      )

      await MongoTeams.removeTeam(teamsToSave[0].id)

      const teamsList = (await MongoTeams.listAllTeams())
        .value as WithId<TeamProps>[]

      expect(teamsList).toHaveLength(1)
      expect(teamsList[0].id).toBe(teamsToSave[1].id)
    })
  })

  describe('Update Team', () => {
    it('Should update an existing team on the database', async () => {
      const teamToSave = TeamWithIdBuilder.aTeam().build()
      await MongoTeams.createTeam(teamToSave)

      const teamWithNewInfos = TeamWithIdBuilder.aTeam().withNewInfos().build()
      await MongoTeams.updateTeam(teamToSave.id, teamWithNewInfos)

      const registeredTeam = (await MongoTeams.recoverTeamById(teamToSave.id))
        .value as WithId<TeamProps>
      expect(registeredTeam.name).toBe(teamWithNewInfos.name)
      expect(registeredTeam.fullName).toBe(teamWithNewInfos.fullName)
    })
  })
})
