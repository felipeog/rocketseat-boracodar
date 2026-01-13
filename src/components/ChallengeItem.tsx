import type { Challenge, ChallengeStatus } from '../types/Challenge'
import './ChallengeItem.css'

interface ChallengeItemProps {
  challenge: Challenge
  onStatusChange: (id: number, status: ChallengeStatus) => void
}

const STATUS_OPTIONS: { value: ChallengeStatus; label: string }[] = [
  { value: 'todo', label: 'Todo' },
  { value: 'doing', label: 'Doing' },
  { value: 'done', label: 'Done' },
]

export function ChallengeItem({ challenge, onStatusChange }: ChallengeItemProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(challenge.id, e.target.value as ChallengeStatus)
  }

  return (
    <li className="challenge-item">
      <span className="challenge-id">#{challenge.id}</span>
      <a href={challenge.url} target="_blank" rel="noopener noreferrer">
        {challenge.title}
      </a>
      <select
        className="challenge-status-select"
        value={challenge.status}
        onChange={handleStatusChange}
        data-status={challenge.status}
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </li>
  )
}
