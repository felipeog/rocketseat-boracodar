import { useRef, useState } from 'react'
import type { Challenge } from '../types/Challenge'
import { exportChallenges, importChallenges } from '../utils/importExport'
import './ImportExport.css'

interface ImportExportProps {
  challenges: Challenge[]
  onImport: (challenges: Challenge[]) => void
  onReset: () => void
}

type FeedbackMessage = {
  type: 'success' | 'error'
  text: string
}

export function ImportExport({ challenges, onImport, onReset }: ImportExportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const showFeedback = (message: FeedbackMessage) => {
    setFeedback(message)
    setTimeout(() => setFeedback(null), 5000)
  }

  const handleExport = () => {
    exportChallenges(challenges)
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      const { result, challenges: updatedChallenges } = importChallenges(content, challenges)

      if (result.success && updatedChallenges) {
        onImport(updatedChallenges)
        showFeedback({
          type: 'success',
          text: `Successfully updated ${result.updatedCount} challenge(s)`,
        })
      } else {
        showFeedback({
          type: 'error',
          text: result.error ?? 'Import failed',
        })
      }

      // Clear the input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }

    reader.onerror = () => {
      showFeedback({ type: 'error', text: 'Failed to read file' })
    }

    reader.readAsText(file)
  }

  const handleResetClick = () => {
    setShowResetConfirm(true)
  }

  const handleResetConfirm = () => {
    onReset()
    setShowResetConfirm(false)
    showFeedback({ type: 'success', text: 'Progress has been reset' })
  }

  const handleResetCancel = () => {
    setShowResetConfirm(false)
  }

  return (
    <div className="import-export">
      <div className="import-export-buttons" role="group" aria-label="Progress management">
        <button
          type="button"
          className="import-export-btn"
          onClick={handleExport}
          aria-label="Export progress to JSON file"
        >
          Export
        </button>
        <button
          type="button"
          className="import-export-btn"
          onClick={handleImportClick}
          aria-label="Import progress from JSON file"
        >
          Import
        </button>
        <button
          type="button"
          className="import-export-btn import-export-btn-danger"
          onClick={handleResetClick}
          aria-label="Reset all progress"
        >
          Reset
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          aria-hidden="true"
          tabIndex={-1}
          style={{ display: 'none' }}
        />
      </div>

      {showResetConfirm && (
        <div className="reset-confirm" role="alertdialog" aria-labelledby="reset-title">
          <p id="reset-title">Reset all progress? This cannot be undone.</p>
          <div className="reset-confirm-actions">
            <button
              type="button"
              className="reset-confirm-btn reset-confirm-btn-danger"
              onClick={handleResetConfirm}
            >
              Yes, Reset
            </button>
            <button
              type="button"
              className="reset-confirm-btn"
              onClick={handleResetCancel}
              autoFocus
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {feedback && (
        <div
          className={`import-result ${feedback.type}`}
          role="status"
          aria-live="polite"
        >
          {feedback.text}
        </div>
      )}
    </div>
  )
}
