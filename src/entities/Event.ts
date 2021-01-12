export type Event = {
  title: string
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
