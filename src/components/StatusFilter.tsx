import { NavLink } from 'react-router-dom'
import type { ChallengeStatus } from '../types/Challenge'
import './StatusFilter.css'

export type FilterValue = ChallengeStatus | 'all'

interface StatusFilterProps {
  value: FilterValue
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

export function StatusFilter({ value, counts }: StatusFilterProps) {
  return (
    <nav className="status-filter" aria-label="Filter challenges by status">
      {FILTER_OPTIONS.map((option) => (
        <NavLink
          key={option.value}
          to={`/${option.value}`}
          className={({ isActive }) =>
            `status-filter-btn ${isActive ? 'active' : ''}`
          }
          data-status={option.value}
          aria-current={value === option.value ? 'page' : undefined}
          aria-label={`${option.label}: ${counts[option.value]} challenges`}
        >
          {option.label}
          <span className="status-filter-count" aria-hidden="true">
            {counts[option.value]}
          </span>
        </NavLink>
      ))}
    </nav>
  )
}
