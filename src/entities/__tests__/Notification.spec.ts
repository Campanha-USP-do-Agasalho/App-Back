import { Notification } from '@entities'
import {
  InvalidNameError,
  InvalidDateError,
  InvalidScheduleError
} from '@entities/errors'

import { left } from '@shared/Either'

describe('Notification Entity', () => {
  it('Should not create a notification with a title to short (-5)', () => {
    const shortTitle = 'AA'
    const title0rError = Title.create({
      title: shortTitle,
      body: 'ABCDEFGH',
      members: [],
      timeInit: '13:50',
      timeEnd: '14:50'
    })

    expect(title0rError).toEqual(left(new InvalidNameError('AA')))
  })

  it('Should not create a notification with a title to big', () => {
    const bigTitle = 'A'.repeat(256)
    const title0rError = Title.create({
      title: bigTitle,
      body: 'ABCDEFGH',
      members: [],
      timeInit: '13:50',
      timeEnd: '14:50'
    })

    expect(title0rError).toEqual(left(new InvalidNameError(bigTitle)))
  })

  it('Should not create a notification with a body to short (-5)', () => {
    const shortTitle = 'AA'
    const title0rError = Title.create({
      title: 'ABCDEFGH',
      body: shortTitle,
      members: [],
      date: '12/12/12',
      scheduleInit: '13:50',
      scheduleEnd: '14:50'
    })

    expect(title0rError).toEqual(left(new InvalidNameError('AA')))
  })

  it('Should not create a notification with a body to big', () => {
    const bigTitle = 'A'.repeat(256)
    const title0rError = Title.create({
      title: 'ABCDEFGH',
      body: bigTitle,
      members: [],
      date: '12/12/12',
      scheduleInit: '13:50',
      scheduleEnd: '14:50'
    })

    expect(title0rError).toEqual(left(new InvalidNameError(bigTitle)))
  })

  it('Should not create a notification with date poorly formatted', () => {
    const bigTitle = 'A'.repeat(256)
    const title0rError = Title.create({
      title: 'ABCDEFGH',
      body: bigTitle,
      members: [],
      date: '12/12',
      scheduleInit: '13:50',
      scheduleEnd: '14:50'
    })

    expect(title0rError).toEqual(left(new InvalidDateError('12/12')))
  })

  it('Should not create a notification with schedule poorly formatted', () => {
    const bigTitle = 'A'.repeat(256)
    const title0rError = Title.create({
      title: 'ABCDEFGH',
      body: bigTitle,
      members: [],
      date: '12/12',
      scheduleInit: '13',
      scheduleEnd: '14:50'
    })

    expect(title0rError).toEqual(left(new InvalidScheduleError('13')))
  })
})
