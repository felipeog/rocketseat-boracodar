import './App.css'
import challengesData from './data/challenges.json'
import type { BaseChallenge, Challenge } from './types/Challenge'

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
      <h1>Bora Codar - Challenge Tracker</h1>
      <p>Loaded {initialChallenges.length} challenges</p>
      <ul className="challenge-list">
        {initialChallenges.map((challenge) => (
          <li key={challenge.id} className="challenge-item">
            <span className="challenge-id">#{challenge.id}</span>
            <a href={challenge.url} target="_blank" rel="noopener noreferrer">
              {challenge.title}
            </a>
            <span className="challenge-status" data-status={challenge.status}>
              {challenge.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
