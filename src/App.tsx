import { useMemo, useState } from 'react'
import './App.css'
import challengesData from './data/challenges.json'
import type { BaseChallenge, Challenge, ChallengeStatus } from './types/Challenge'
import { ChallengeList } from './components/ChallengeList'
import { StatusFilter, type FilterValue } from './components/StatusFilter'

const initialChallenges: Challenge[] = (challengesData as BaseChallenge[]).map(
  (challenge) => ({
    ...challenge,
    status: 'todo',
    githubRepoUrl: null,
  })
)

function App() {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges)
  const [filter, setFilter] = useState<FilterValue>('all')

  const handleStatusChange = (id: number, status: ChallengeStatus) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id ? { ...challenge, status } : challenge
      )
    )
  }

  const handleGithubUrlChange = (id: number, githubRepoUrl: string | null) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id ? { ...challenge, githubRepoUrl } : challenge
      )
    )
  }

  const counts = useMemo(() => ({
    all: challenges.length,
    todo: challenges.filter((c) => c.status === 'todo').length,
    doing: challenges.filter((c) => c.status === 'doing').length,
    done: challenges.filter((c) => c.status === 'done').length,
  }), [challenges])

  const filteredChallenges = useMemo(() => {
    if (filter === 'all') return challenges
    return challenges.filter((c) => c.status === filter)
  }, [challenges, filter])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Bora Codar - Challenge Tracker</h1>
        <StatusFilter value={filter} onChange={setFilter} counts={counts} />
      </header>
      <main>
        <ChallengeList
          challenges={filteredChallenges}
          onStatusChange={handleStatusChange}
          onGithubUrlChange={handleGithubUrlChange}
        />
      </main>
    </div>
  )
}

export default App
