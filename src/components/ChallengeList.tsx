import type { Challenge, ChallengeStatus } from '../types/Challenge'
import { ChallengeItem } from './ChallengeItem'
import './ChallengeList.css'

interface ChallengeListProps {
  challenges: Challenge[]
  onStatusChange: (id: number, status: ChallengeStatus) => void
  onGithubUrlChange: (id: number, url: string | null) => void
}

export function ChallengeList({ challenges, onStatusChange, onGithubUrlChange }: ChallengeListProps) {
  // Always sort by id ascending - no manual reordering allowed
  const sortedChallenges = [...challenges].sort((a, b) => a.id - b.id)

  if (sortedChallenges.length === 0) {
    return <p className="challenge-list-empty">No challenges found.</p>
  }

  return (
    <ul className="challenge-list">
      {sortedChallenges.map((challenge) => (
        <ChallengeItem
          key={challenge.id}
          challenge={challenge}
          onStatusChange={onStatusChange}
          onGithubUrlChange={onGithubUrlChange}
        />
      ))}
    </ul>
  )
}
