export type Player = {
  name: string
}

export type Match = {
  playerA: Player
  playerB: Player
  scoreA: number
  scoreB: number
}

export type Tournament = {
  matches: Match[]
}
