import { Name, PeriodId } from '@entities'

export type Event = {
  title: Name
  period: PeriodId
  group: Name
  team: string
  date: {
    begin: Date
    end: Date
  }
  loop?: string
  inscriptionLink?: string
  place: string
  notifications: Date[]
  lists: {
    subscribers?: string[]
    presence: string[]
  }
}
