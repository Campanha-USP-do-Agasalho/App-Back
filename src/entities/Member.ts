import { ROLE } from "./Role";

export type Member = {
  name: string
  nickName: string
  image: string
  email: string
  password: string
  team: string
  course: string
  hasCar: boolean
  wpp: string
  role: ROLE
  notifications: {
    email: boolean
    all: boolean
    meetings: boolean
    events: boolean
  }
}
