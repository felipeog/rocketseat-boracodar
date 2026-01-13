import { useCallback, useEffect, useState } from 'react'
import type { BaseChallenge, Challenge, ChallengeStatus } from '../types/Challenge'
import challengesData from '../data/challenges.json'

const STORAGE_KEY = 'boracodar-challenges'

interface StoredChallenge {
  id: number
  status: ChallengeStatus
  githubRepoUrl: string | null
}

function isValidStatus(status: unknown): status is ChallengeStatus {
  return status === 'todo' || status === 'doing' || status === 'done'
}

function loadFromStorage(): Map<number, StoredChallenge> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return new Map()

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return new Map()

    const map = new Map<number, StoredChallenge>()
    for (const item of parsed) {
      if (typeof item.id === 'number' && isValidStatus(item.status)) {
        map.set(item.id, {
          id: item.id,
          status: item.status,
          githubRepoUrl: typeof item.githubRepoUrl === 'string' ? item.githubRepoUrl : null,
        })
      }
    }
    return map
  } catch {
    return new Map()
  }
}

function saveToStorage(challenges: Challenge[]): void {
  const data: StoredChallenge[] = challenges.map((c) => ({
    id: c.id,
    status: c.status,
    githubRepoUrl: c.githubRepoUrl,
  }))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function initializeChallenges(): Challenge[] {
  const storedMap = loadFromStorage()

  return (challengesData as BaseChallenge[]).map((challenge) => {
    const stored = storedMap.get(challenge.id)
    return {
      ...challenge,
      status: stored?.status ?? 'todo',
      githubRepoUrl: stored?.githubRepoUrl ?? null,
    }
  })
}

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>(initializeChallenges)

  // Save to localStorage whenever challenges change
  useEffect(() => {
    saveToStorage(challenges)
  }, [challenges])

  const updateStatus = useCallback((id: number, status: ChallengeStatus) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id ? { ...challenge, status } : challenge
      )
    )
  }, [])

  const updateGithubUrl = useCallback((id: number, githubRepoUrl: string | null) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id ? { ...challenge, githubRepoUrl } : challenge
      )
    )
  }, [])

  const importChallenges = useCallback((imported: Challenge[]) => {
    setChallenges(imported)
  }, [])

  return {
    challenges,
    updateStatus,
    updateGithubUrl,
    importChallenges,
  }
}
