import { Notification } from '@entities'
import { InvalidNameError, InvalidBodyError } from '@entities/errors'

import { left } from '@shared/Either'

describe('Notification Entity', () => {
  it('Should not create a notification with a title to short (-2)', () => {
    const shortTitle = 'A'
    const title0rError = Notification.create({
      title: shortTitle,
      body: 'ABCDEFGH',
      members: [],
      date: new Date(2020, 3, 10, 9).valueOf()
    })

    expect(title0rError).toEqual(left(new InvalidNameError('A')))
  })

  it('Should not create a notification with a title to big', () => {
    const bigTitle = 'A'.repeat(256)
    const title0rError = Notification.create({
      title: bigTitle,
      body: 'ABCDEFGH',
      members: [],
      date: new Date(2020, 3, 10, 9).valueOf()
    })

    expect(title0rError).toEqual(left(new InvalidNameError(bigTitle)))
  })

  it('Should not create a notification with a body to short (-2)', () => {
    const shortTitle = 'A'
    const title0rError = Notification.create({
      title: 'ABCDEFGH',
      body: shortTitle,
      members: [],
      date: new Date(2020, 3, 10, 9).valueOf()
    })

    expect(title0rError).toEqual(left(new InvalidBodyError('A')))
  })

  it('Should not create a notification with a body to big', () => {
    const bigTitle = 'A'.repeat(256)
    const title0rError = Notification.create({
      title: 'ABCDEFGH',
      body: bigTitle,
      members: [],
      date: new Date(2020, 3, 10, 9).valueOf()
    })

    expect(title0rError).toEqual(left(new InvalidBodyError(bigTitle)))
  })

  it('Sould create a valid notification', () => {
    const notification0rError = Notification.create({
      title: 'Titulo do Evento',
      body: 'ABCDEFGH',
      members: [],
      date: new Date(2020, 3, 10, 9).valueOf(),
      scheduleInit: new Date(2020, 3, 10, 9).valueOf(),
      scheduleEnd: new Date(2020, 3, 10, 9).valueOf()
    })

    expect(notification0rError.isRight()).toBeTruthy()
    expect((<Notification>notification0rError.value).value).toStrictEqual({
      title: 'Titulo do Evento',
      body: 'ABCDEFGH',
      members: [],
      date: new Date(2020, 3, 10, 9),
      scheduleInit: new Date(2020, 3, 10, 9),
      scheduleEnd: new Date(2020, 3, 10, 9)
    })
  })
})
