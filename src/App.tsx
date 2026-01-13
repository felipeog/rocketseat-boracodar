import { useState } from 'react'
import './App.css'
import challengesData from './data/challenges.json'
import type { BaseChallenge, Challenge, ChallengeStatus } from './types/Challenge'
import { ChallengeList } from './components/ChallengeList'

const initialChallenges: Challenge[] = (challengesData as BaseChallenge[]).map(
  (challenge) => ({
    ...challenge,
    status: 'todo',
    githubRepoUrl: null,
  })
)

function App() {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges)

  const handleStatusChange = (id: number, status: ChallengeStatus) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id ? { ...challenge, status } : challenge
      )
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Bora Codar - Challenge Tracker</h1>
        <p>{challenges.length} challenges</p>
      </header>
      <main>
        <ChallengeList challenges={challenges} onStatusChange={handleStatusChange} />
      </main>
    </div>
  )
}

export default App
