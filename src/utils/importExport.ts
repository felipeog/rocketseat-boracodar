import type { Challenge, ChallengeStatus } from '../types/Challenge'

interface ExportedChallenge {
  id: number
  status: ChallengeStatus
  githubRepoUrl: string | null
}

interface ExportData {
  version: 1
  exportedAt: string
  challenges: ExportedChallenge[]
}

export function exportChallenges(challenges: Challenge[]): void {
  const exportData: ExportData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    challenges: challenges.map((c) => ({
      id: c.id,
      status: c.status,
      githubRepoUrl: c.githubRepoUrl,
    })),
  }

  const json = JSON.stringify(exportData, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `boracodar-progress-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export interface ImportResult {
  success: boolean
  error?: string
  updatedCount?: number
}

export function importChallenges(
  fileContent: string,
  currentChallenges: Challenge[]
): { result: ImportResult; challenges?: Challenge[] } {
  try {
    const data = JSON.parse(fileContent)

    // Validate structure
    if (!data || typeof data !== 'object') {
      return { result: { success: false, error: 'Invalid file format' } }
    }

    if (!Array.isArray(data.challenges)) {
      return { result: { success: false, error: 'Missing challenges array' } }
    }

    // Create a map of imported data by ID
    const importedMap = new Map<number, ExportedChallenge>()
    for (const item of data.challenges) {
      if (typeof item.id === 'number' && isValidStatus(item.status)) {
        importedMap.set(item.id, {
          id: item.id,
          status: item.status,
          githubRepoUrl: typeof item.githubRepoUrl === 'string' ? item.githubRepoUrl : null,
        })
      }
    }

    // Merge imported data with current challenges
    let updatedCount = 0
    const updatedChallenges = currentChallenges.map((challenge) => {
      const imported = importedMap.get(challenge.id)
      if (imported) {
        updatedCount++
        return {
          ...challenge,
          status: imported.status,
          githubRepoUrl: imported.githubRepoUrl,
        }
      }
      return challenge
    })

    return {
      result: { success: true, updatedCount },
      challenges: updatedChallenges,
    }
  } catch {
    return { result: { success: false, error: 'Failed to parse JSON file' } }
  }
}

function isValidStatus(status: unknown): status is ChallengeStatus {
  return status === 'todo' || status === 'doing' || status === 'done'
}
