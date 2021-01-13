export type Team = {
  name: string
  fullName: string
  score: {
    [period: string]: number
  }
}
