import './App.css'
import challengesData from './data/challenges.json'
import type { BaseChallenge, Challenge } from './types/Challenge'
import { ChallengeList } from './components/ChallengeList'

const initialChallenges: Challenge[] = (challengesData as BaseChallenge[]).map(
  (challenge) => ({
    ...challenge,
    status: 'todo',
    githubRepoUrl: null,
  })
)

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Bora Codar - Challenge Tracker</h1>
        <p>{initialChallenges.length} challenges</p>
      </header>
      <main>
        <ChallengeList challenges={initialChallenges} />
      </main>
    </div>
  )
}

export default App
