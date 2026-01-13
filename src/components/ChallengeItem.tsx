import type { Challenge } from '../types/Challenge'
import './ChallengeItem.css'

interface ChallengeItemProps {
  challenge: Challenge
}

export function ChallengeItem({ challenge }: ChallengeItemProps) {
  return (
    <li className="challenge-item">
      <span className="challenge-id">#{challenge.id}</span>
      <a href={challenge.url} target="_blank" rel="noopener noreferrer">
        {challenge.title}
      </a>
      <span className="challenge-status" data-status={challenge.status}>
        {challenge.status}
      </span>
    </li>
  )
}
