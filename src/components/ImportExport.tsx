import { useRef, useState } from 'react'
import type { Challenge } from '../types/Challenge'
import { exportChallenges, importChallenges, type ImportResult } from '../utils/importExport'
import './ImportExport.css'

interface ImportExportProps {
  challenges: Challenge[]
  onImport: (challenges: Challenge[]) => void
}

export function ImportExport({ challenges, onImport }: ImportExportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)

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

      setImportResult(result)

      if (result.success && updatedChallenges) {
        onImport(updatedChallenges)
      }

      // Clear the input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      // Clear the result message after 5 seconds
      setTimeout(() => setImportResult(null), 5000)
    }

    reader.onerror = () => {
      setImportResult({ success: false, error: 'Failed to read file' })
      setTimeout(() => setImportResult(null), 5000)
    }

    reader.readAsText(file)
  }

  return (
    <div className="import-export">
      <div className="import-export-buttons" role="group" aria-label="Import and export options">
        <button
          type="button"
          className="import-export-btn"
          onClick={handleExport}
          aria-label="Export progress to JSON file"
        >
          Export Progress
        </button>
        <button
          type="button"
          className="import-export-btn"
          onClick={handleImportClick}
          aria-label="Import progress from JSON file"
        >
          Import Progress
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
      {importResult && (
        <div
          className={`import-result ${importResult.success ? 'success' : 'error'}`}
          role="status"
          aria-live="polite"
        >
          {importResult.success
            ? `Successfully updated ${importResult.updatedCount} challenge(s)`
            : importResult.error}
        </div>
      )}
    </div>
  )
}
