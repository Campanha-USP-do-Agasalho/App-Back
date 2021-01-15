import { ROLE } from '@entities/Role'

export type Member = {
  name: string
  nickName: string
  image: string
  email: string
  password: string
  team: {
    [period: string]: string
  }
  course: string
  hasCar: boolean
  wpp: string
  role: ROLE
  periods: string[]
  notifications: {
    email: boolean
    all: boolean
    meetings: boolean
    events: boolean
  }
}
