import { Event } from '@entities'
import { InvalidNameError, InvalidSemesterError } from '@entities/errors'

import { left } from '@shared/Either'

describe('Event Entity', () => {
  it('Should create an event with valid props', () => {
    const eventsOrError = Event.create({
      group: 'Primeira triagem',
      title: 'Primeira triagem - Sábado - 09:00 - 12:00',
      period: {
        year: 2020,
        semester: 1
      },
      team: 'entidades',
      date: {
        begin: new Date(2020, 3, 10, 9).valueOf(),
        end: new Date(2020, 3, 10, 12).valueOf()
      },
      place: 'Salão de Eventos do CEFER'
    })

    expect(eventsOrError.isRight()).toBeTruthy()
    expect((<Event>eventsOrError.value).value).toStrictEqual({
      group: 'Primeira triagem',
      title: 'Primeira triagem - Sábado - 09:00 - 12:00',
      period: '2020-1',
      team: 'entidades',
      date: {
        begin: new Date(2020, 3, 10, 9),
        end: new Date(2020, 3, 10, 12)
      },
      place: 'Salão de Eventos do CEFER',
      inscriptionLink: null,
      notifications: [],
      lists: {
        subscribers: [],
        presence: []
      }
    })
  })

  it('Should create an event with valid props and group equal to title if omitted', () => {
    const eventsOrError = Event.create({
      title: 'Saída às Ruas',
      period: {
        year: 2020,
        semester: 1
      },
      team: 'infra',
      date: {
        begin: new Date(2020, 4, 10, 12).valueOf(),
        end: new Date(2020, 4, 10, 17).valueOf()
      },
      place: 'Palquinho'
    })

    expect(eventsOrError.isRight()).toBeTruthy()
    expect((<Event>eventsOrError.value).value).toStrictEqual({
      group: 'Saída às Ruas',
      title: 'Saída às Ruas',
      period: '2020-1',
      team: 'infra',
      date: {
        begin: new Date(2020, 4, 10, 12),
        end: new Date(2020, 4, 10, 17)
      },
      place: 'Palquinho',
      inscriptionLink: null,
      notifications: [],
      lists: {
        subscribers: [],
        presence: []
      }
    })
  })

  it('Should create an event with valid props plus inscription link', () => {
    const eventsOrError = Event.create({
      group: 'Workshops',
      title: 'Workshop Photoshop',
      period: {
        year: 2020,
        semester: 1
      },
      team: 'divulga',
      date: {
        begin: new Date(2020, 2, 10, 19).valueOf(),
        end: new Date(2020, 2, 10, 21).valueOf()
      },
      place: 'https://meet.google.com/algumaCoisa',
      inscriptionLink: 'https://form.google.com/outraCoisa'
    })

    expect(eventsOrError.isRight()).toBeTruthy()
    expect((<Event>eventsOrError.value).value).toStrictEqual({
      group: 'Workshops',
      title: 'Workshop Photoshop',
      period: '2020-1',
      team: 'divulga',
      date: {
        begin: new Date(2020, 2, 10, 19),
        end: new Date(2020, 2, 10, 21)
      },
      place: 'https://meet.google.com/algumaCoisa',
      inscriptionLink: 'https://form.google.com/outraCoisa',
      notifications: [],
      lists: {
        subscribers: [],
        presence: []
      }
    })
  })

  it('Should create an event with valid props and notifications', () => {
    const eventsOrError = Event.create({
      group: 'REuniões',
      title: 'Reunião 10/06',
      period: {
        year: 2020,
        semester: 1
      },
      team: 're',
      date: {
        begin: new Date(2020, 5, 10, 12).valueOf(),
        end: new Date(2020, 5, 10, 13).valueOf()
      },
      place: 'discord.link/numsei',
      notifications: [-3600000]
    })

    expect(eventsOrError.isRight()).toBeTruthy()
    expect((<Event>eventsOrError.value).value).toStrictEqual({
      group: 'REuniões',
      title: 'Reunião 10/06',
      period: '2020-1',
      team: 're',
      date: {
        begin: new Date(2020, 5, 10, 12),
        end: new Date(2020, 5, 10, 13)
      },
      place: 'discord.link/numsei',
      inscriptionLink: null,
      notifications: [-3600000],
      lists: {
        subscribers: [],
        presence: []
      }
    })
  })

  it('Should create an event with valid props and subscribers list', () => {
    const eventsOrError = Event.create({
      group: 'Reuniões Geraldas',
      title: 'Reunião 10/07',
      period: {
        year: 2020,
        semester: 2
      },
      team: 'geral',
      date: {
        begin: new Date(2020, 6, 10, 19).valueOf(),
        end: new Date(2020, 6, 10, 23).valueOf()
      },
      place: 'REPsy',
      subscribers: ['psy', 'graja', 'coisa']
    })

    expect(eventsOrError.isRight()).toBeTruthy()
    expect((<Event>eventsOrError.value).value).toStrictEqual({
      group: 'Reuniões Geraldas',
      title: 'Reunião 10/07',
      period: '2020-2',
      team: 'geral',
      date: {
        begin: new Date(2020, 6, 10, 19),
        end: new Date(2020, 6, 10, 23)
      },
      place: 'REPsy',
      inscriptionLink: null,
      notifications: [],
      lists: {
        subscribers: ['psy', 'graja', 'coisa'],
        presence: []
      }
    })
  })

  it('Should not create an event with invalid group', () => {
    const eventsOrError = Event.create({
      group: 'T',
      title: 'Primeira triagem - Sábado - 09:00 - 12:00',
      period: {
        year: 2020,
        semester: 1
      },
      team: 'entidades',
      date: {
        begin: new Date(2020, 3, 10, 9).valueOf(),
        end: new Date(2020, 3, 10, 12).valueOf()
      },
      place: 'Salão de Eventos do CEFER'
    })

    expect(eventsOrError).toEqual(left(new InvalidNameError('T')))
  })

  it('Should not create an event with invalid title', () => {
    const eventsOrError = Event.create({
      title: '123',
      period: {
        year: 2020,
        semester: 1
      },
      team: 'infra',
      date: {
        begin: new Date(2020, 4, 10, 12).valueOf(),
        end: new Date(2020, 4, 10, 17).valueOf()
      },
      place: 'Palquinho'
    })

    expect(eventsOrError).toEqual(left(new InvalidNameError('123')))
  })

  it('Should not create an event with invalid period', () => {
    const eventsOrError = Event.create({
      group: 'Workshops',
      title: 'Workshop Photoshop',
      period: {
        year: 2020,
        semester: 6
      },
      team: 'divulga',
      date: {
        begin: new Date(2020, 2, 10, 19).valueOf(),
        end: new Date(2020, 2, 10, 21).valueOf()
      },
      place: 'https://meet.google.com/algumaCoisa',
      inscriptionLink: 'https://form.google.com/outraCoisa'
    })

    expect(eventsOrError).toEqual(left(new InvalidSemesterError('6')))
  })
})
