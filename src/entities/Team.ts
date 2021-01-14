import { Name } from "./Name"

export type Team = {
  name: Name
  fullName: Name
  score: {
    [period: string]: number
  }
}
