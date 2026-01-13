import './App.css'
import challengesData from './data/challenges.json'

function App() {
  return (
    <div className="app">
      <h1>Bora Codar - Challenge Tracker</h1>
      <p>Loaded {challengesData.length} challenges</p>
      <ul className="challenge-list">
        {challengesData.map((challenge) => (
          <li key={challenge.id} className="challenge-item">
            <span className="challenge-id">#{challenge.id}</span>
            <a href={challenge.url} target="_blank" rel="noopener noreferrer">
              {challenge.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
