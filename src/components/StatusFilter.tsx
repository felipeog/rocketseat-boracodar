import type { ChallengeStatus } from '../types/Challenge'
import './StatusFilter.css'

export type FilterValue = ChallengeStatus | 'all'

interface StatusFilterProps {
  value: FilterValue
  onChange: (value: FilterValue) => void
  counts: {
    all: number
    todo: number
    doing: number
    done: number
  }
}

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'Todo' },
  { value: 'doing', label: 'Doing' },
  { value: 'done', label: 'Done' },
]

export function StatusFilter({ value, onChange, counts }: StatusFilterProps) {
  return (
    <div className="status-filter">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={`status-filter-btn ${value === option.value ? 'active' : ''}`}
          data-status={option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          <span className="status-filter-count">{counts[option.value]}</span>
        </button>
      ))}
    </div>
  )
}
