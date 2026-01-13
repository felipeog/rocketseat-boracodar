import { useMemo, useState } from 'react'
import './App.css'
import { ChallengeList } from './components/ChallengeList'
import { StatusFilter, type FilterValue } from './components/StatusFilter'
import { ImportExport } from './components/ImportExport'
import { useChallenges } from './hooks/useChallenges'

function App() {
  const { challenges, updateStatus, updateGithubUrl, importChallenges, resetProgress } = useChallenges()
  const [filter, setFilter] = useState<FilterValue>('all')

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
        <div className="app-header-top">
          <h1>Bora Codar - Challenge Tracker</h1>
          <ImportExport
            challenges={challenges}
            onImport={importChallenges}
            onReset={resetProgress}
          />
        </div>
        <StatusFilter value={filter} onChange={setFilter} counts={counts} />
      </header>
      <main>
        <ChallengeList
          challenges={filteredChallenges}
          onStatusChange={updateStatus}
          onGithubUrlChange={updateGithubUrl}
        />
      </main>
    </div>
  )
}

export default App
