import { PeriodId } from './PeriodId'

export type Period = {
  id: PeriodId
  members: string[]
  coords: string[]
  events: string[]
  teams: string[]
}
