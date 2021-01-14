describe('Team Entity', () => {
  it('Should create a new team', () => {
    const teamOrError = Team.create({ name: 'Infra', fullName: 'Infraestrutura' })

    expect(teamOrError.isRight()).toBeTruthy()
  })

  it('Should not create a team with invalid name', () => {
    const longName = 'A'.repeat(256)
    const teamOrError = Team.create({ name: longName, fullName: 'AAAAA' })

    expect(teamOrError).toEqual(left(new InvalidNameError(longName)))
  })

  it('Should not create a team with invalid fullName', () => {
    const teamOrError = Team.create({ name: 'AAAAA', fullName: 'A' })

    expect(teamOrError).toEqual(left(new InvalidNameError('A')))
  })
})
