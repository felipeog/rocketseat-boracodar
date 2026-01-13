export type ChallengeStatus = 'todo' | 'doing' | 'done'

export interface BaseChallenge {
  id: number
  title: string
  url: string
}

export interface Challenge extends BaseChallenge {
  status: ChallengeStatus
  githubRepoUrl: string | null
}
