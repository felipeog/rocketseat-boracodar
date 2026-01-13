import { useMemo } from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import './App.css'
import { ChallengeList } from './components/ChallengeList'
import { StatusFilter, type FilterValue } from './components/StatusFilter'
import { ImportExport } from './components/ImportExport'
import { useChallenges } from './hooks/useChallenges'

const VALID_FILTERS: FilterValue[] = ['all', 'todo', 'doing', 'done']

function isValidFilter(value: string | undefined): value is FilterValue {
  return VALID_FILTERS.includes(value as FilterValue)
}

function ChallengeTracker() {
  const { filter } = useParams<{ filter: string }>()
  const { challenges, updateStatus, updateGithubUrl, importChallenges, resetProgress } = useChallenges()

  const currentFilter: FilterValue = isValidFilter(filter) ? filter : 'all'

  const counts = useMemo(() => ({
    all: challenges.length,
    todo: challenges.filter((c) => c.status === 'todo').length,
    doing: challenges.filter((c) => c.status === 'doing').length,
    done: challenges.filter((c) => c.status === 'done').length,
  }), [challenges])

  const filteredChallenges = useMemo(() => {
    if (currentFilter === 'all') return challenges
    return challenges.filter((c) => c.status === currentFilter)
  }, [challenges, currentFilter])

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
        <StatusFilter value={currentFilter} counts={counts} />
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/all" replace />} />
      <Route path="/:filter" element={<ChallengeTracker />} />
    </Routes>
  )
}

export default App
