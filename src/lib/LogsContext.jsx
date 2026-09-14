import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import seedData from '../../data/logs.json'

// Persistence model: data/logs.json is the source of truth on disk. This app
// never writes to it directly (it's a static frontend, no backend). Instead:
//   1. Seed data loads here on start.
//   2. Anything logged in-app is added to React state only (an "overlay") so
//      it's visible immediately for the rest of the session.
//   3. Every add-entry form also offers a "Copy JSON" button — paste that
//      object into the matching array in data/logs.json to make it durable.
// A page reload without editing the file will revert to the seed data, by
// design — see CLAUDE.md for the full rationale.

const LogsContext = createContext(null)

export function LogsProvider({ children }) {
  const [data, setData] = useState(seedData)
  const [unsavedIds, setUnsavedIds] = useState(() => new Set())

  const addEntry = useCallback((collection, entry) => {
    setData((prev) => ({
      ...prev,
      [collection]: [...(prev[collection] ?? []), entry],
    }))
    if (entry?.id) {
      setUnsavedIds((prev) => new Set(prev).add(`${collection}:${entry.id}`)
      )
    }
  }, [])

  const isUnsaved = useCallback(
    (collection, id) => unsavedIds.has(`${collection}:${id}`),
    [unsavedIds]
  )

  const value = useMemo(() => ({ data, addEntry, isUnsaved }), [data, addEntry, isUnsaved])

  return <LogsContext.Provider value={value}>{children}</LogsContext.Provider>
}

export function useLogs() {
  const ctx = useContext(LogsContext)
  if (!ctx) throw new Error('useLogs must be used within a LogsProvider')
  return ctx
}
