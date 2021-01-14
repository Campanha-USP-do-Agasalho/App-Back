describe('Name Entity', () => {
  it('Should create a new valid name', () => {
    const nameOrError = Name.create('Batatais ')

    expect(nameOrError.isRight()).toBeTruthy()
  })

  it('Should not create a short name (-2)', () => {
    const nameOrError = Name.create('A')

    expect(nameOrError).toEqual(left(new InvalidNameError('A')))
  })

  it('Should not create a long name (+255)', () => {
    const longName = 'A'.repeat(256)
    const nameOrError = Name.create(longName)

    expect(nameOrError).toEqual(left(new InvalidNameError(longName)))
  })

  it('Should not create a number name', () => {
    const nameOrError = Name.create('123')

    expect(nameOrError).toEqual(left(new InvalidNameError('123')))
  })

  it('Should not create an empty name', () => {
    const nameOrError = Name.create('    ')

    expect(nameOrError).toEqual(left(new InvalidNameError('    ')))
  })

  it('Should not create a name with special characters', () => {
    const nameOrError = Name.create('@moeba')

    expect(nameOrError).toEqual(left(new InvalidNameError('@moeba')))
  })
})
