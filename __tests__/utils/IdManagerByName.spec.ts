import { IdManagerByName } from '@adapters/utils'

import { IIdManager } from '@useCases/ports/external/utils'

interface ISutType {
  sut: IIdManager
}

const makeSut = (): ISutType => {
  const sut = new IdManagerByName()
  return { sut }
}

describe('Id Manager By Name', () => {
  it('Should create an id based in the given reference, with all characters in lowercase, trimmed spaces and spaces between words replaced to dots', async () => {
    const { sut } = makeSut()
    const generatedId = await sut.generate('  NoMe cOm EspaÇoo   ')
    expect(generatedId).toBe('nome.com.espaçoo')
  })

  it('Should return an empty string if not passed any reference', async () => {
    const { sut } = makeSut()
    const generatedId = await sut.generate()
    expect(generatedId).toBe('')
  })
})
