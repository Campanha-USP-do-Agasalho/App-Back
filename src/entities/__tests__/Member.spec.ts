import { Member } from '@entities'
import { InvalidNameError, InvalidEmailError } from '@entities/errors'

import { left } from '@shared/Either'

/*
 - Fazer um caso para senha muito curta
 - Tornar course Name
 - Incluir semestre de entrada na campanha( usar PeriodId)
 -  

*/

describe('Member Entity', () => {
  it('Should not create a member with a name to long', () => {
    const longName = 'A'.repeat(256)
    const memberOrError = Member.create({
      name: longName,
      nickName: 'AAAAA',
      image: 'AAAAA',
      email: 'email@email.com',
      password: 'AAAAA',
      course: 'AAAAA',
      hasCar: true,
      wpp: 'AAAAA',
      role: 0,
      periods: []
    })

    expect(memberOrError).toEqual(left(new InvalidNameError(longName)))
  })

  it('Should not create a member with a name to short', () => {
    const shortName = 'A'
    const memberOrError = Member.create({
      name: shortName,
      nickName: 'AAAAA',
      image: 'AAAAA',
      email: 'email@email.com',
      password: 'AAAAA',
      course: 'AAAAA',
      hasCar: true,
      wpp: 'AAAAA',
      role: 0,
      periods: []
    })

    expect(memberOrError).toEqual(left(new InvalidNameError(shortName)))
  })

  it('Should not create a member with a invalid email', () => {
    const name = 'Aaaa'
    const memberOrError = Member.create({
      name: name,
      nickName: 'AAAAA',
      image: 'AAAAA',
      email: 'email',
      password: 'AAAAA',
      course: 'AAAAA',
      hasCar: true,
      wpp: 'AAAAA',
      role: 0,
      periods: []
    })

    expect(memberOrError).toEqual(left(new InvalidEmailError('email')))
  })

  it('Should create a new Member with NickName equal to name if NickName is omitted', () => {
    const memberOrError = Member.create({
      name: 'Alvaro',
      image: 'AAAAA',
      email: 'email@email.com',
      password: 'AAAAA',
      course: 'AAAAA',
      hasCar: true,
      wpp: 'AAAAA',
      role: 0,
      periods: []
    })
    expect(memberOrError.isRight()).toBeTruthy()
    expect((<Member>memberOrError.value).value).toStrictEqual({
      name: 'Alvaro',
      nickName: 'Alvaro',
      image: 'AAAAA',
      email: 'email@email.com',
      password: 'AAAAA',
      team: {},
      course: 'AAAAA',
      hasCar: true,
      wpp: 'AAAAA',
      role: 0,
      periods: [],
      notification: {
        email: true,
        all: true,
        meetings: true,
        events: true
      }
    })
  })
})
