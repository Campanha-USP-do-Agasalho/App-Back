import { Name, PeriodId } from '@entities'

export type Event = {
  title: Name
  period: PeriodId
  group: string
  team: string
  date: {
    begin: Date
    end: Date
  }
  loop: string
  inscriptionLink: string
  place: string
  notfications: Date[]
  lists: {
    subscribers: string[]
    presence: string[]
  }
}
