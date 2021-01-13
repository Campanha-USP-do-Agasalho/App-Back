export type Event = {
  title: string
  period: string
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
