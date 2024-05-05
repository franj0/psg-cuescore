export type Player = {
  name: string
}

export type Match = {
  playerA: Player
  playerB: Player
  scoreA: number
  scoreB: number
  matchstatus: string
  visible?: boolean
  roundName: string
}

export type Owner = {
  id: string
  name: string
  logo: string
  url: string
}

export type Tournament = {
  id: string
  name: string,
  discipline: string
  displayDate: string
  owner: Owner
  matches: Match[]
}

export type MatchFilter = {
  name: string
  value: string
  checked: boolean
}
