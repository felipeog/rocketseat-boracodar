import { useState } from 'react'
import type { Challenge, ChallengeStatus } from '../types/Challenge'
import './ChallengeItem.css'

interface ChallengeItemProps {
  challenge: Challenge
  onStatusChange: (id: number, status: ChallengeStatus) => void
  onGithubUrlChange: (id: number, url: string | null) => void
}

const STATUS_OPTIONS: { value: ChallengeStatus; label: string }[] = [
  { value: 'todo', label: 'Todo' },
  { value: 'doing', label: 'Doing' },
  { value: 'done', label: 'Done' },
]

const GITHUB_REPO_REGEX = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/i

function isValidGithubUrl(url: string): boolean {
  return GITHUB_REPO_REGEX.test(url)
}

export function ChallengeItem({ challenge, onStatusChange, onGithubUrlChange }: ChallengeItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [urlInput, setUrlInput] = useState(challenge.githubRepoUrl ?? '')
  const [error, setError] = useState<string | null>(null)

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(challenge.id, e.target.value as ChallengeStatus)
  }

  const handleEditClick = () => {
    setUrlInput(challenge.githubRepoUrl ?? '')
    setError(null)
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    setUrlInput(challenge.githubRepoUrl ?? '')
    setError(null)
    setIsEditing(false)
  }

  const handleSaveClick = () => {
    const trimmedUrl = urlInput.trim()

    if (trimmedUrl === '') {
      onGithubUrlChange(challenge.id, null)
      setIsEditing(false)
      setError(null)
      return
    }

    if (!isValidGithubUrl(trimmedUrl)) {
      setError('Please enter a valid GitHub repository URL')
      return
    }

    onGithubUrlChange(challenge.id, trimmedUrl)
    setIsEditing(false)
    setError(null)
  }

  const handleClearClick = () => {
    onGithubUrlChange(challenge.id, null)
    setUrlInput('')
    setIsEditing(false)
    setError(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveClick()
    } else if (e.key === 'Escape') {
      handleCancelClick()
    }
  }

  return (
    <li className="challenge-item">
      <div className="challenge-main">
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
      </div>
      <div className="challenge-github">
        {isEditing ? (
          <div className="github-edit">
            <input
              type="url"
              className={`github-input ${error ? 'github-input-error' : ''}`}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://github.com/user/repo"
              autoFocus
            />
            <div className="github-actions">
              <button className="github-btn github-btn-save" onClick={handleSaveClick}>
                Save
              </button>
              <button className="github-btn github-btn-cancel" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
            {error && <span className="github-error">{error}</span>}
          </div>
        ) : (
          <div className="github-display">
            {challenge.githubRepoUrl ? (
              <>
                <a
                  href={challenge.githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  {challenge.githubRepoUrl}
                </a>
                <button className="github-btn github-btn-edit" onClick={handleEditClick}>
                  Edit
                </button>
                <button className="github-btn github-btn-clear" onClick={handleClearClick}>
                  Clear
                </button>
              </>
            ) : (
              <button className="github-btn github-btn-add" onClick={handleEditClick}>
                + Add GitHub Repo
              </button>
            )}
          </div>
        )}
      </div>
    </li>
  )
}
