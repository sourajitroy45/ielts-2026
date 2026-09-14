import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// Durable, per-browser practice progress: completed content, vocabulary
// spaced-repetition state, and study-plan checklist state. Lives in
// localStorage (not data/logs.json) because it's session/device-local UX
// state, not a record you'd want to hand-edit or commit — see CLAUDE.md.

const STORAGE_KEY = 'ielts2026:progress:v1'

const LEITNER_INTERVALS = { 1: 1, 2: 2, 3: 4, 4: 7, 5: 14 } // days per box

const XP_VALUES = {
  reading: 15,
  listening: 15,
  writing: 20,
  speaking: 20,
  vocabReview: 2,
  planTask: 15,
  planMock: 50,
}

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function addDaysStr(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function emptyBlob() {
  return {
    completedContent: { reading: {}, listening: {}, writing: {}, speaking: {} },
    vocab: {},
    plan: {},
  }
}

function loadBlob() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyBlob()
    const parsed = JSON.parse(raw)
    return { ...emptyBlob(), ...parsed, completedContent: { ...emptyBlob().completedContent, ...parsed.completedContent } }
  } catch {
    return emptyBlob()
  }
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [blob, setBlob] = useState(() => loadBlob())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blob))
    } catch {
      // localStorage unavailable (private mode etc.) — progress just won't persist.
    }
  }, [blob])

  const markContentDone = useCallback((skill, id, meta = {}) => {
    setBlob((prev) => ({
      ...prev,
      completedContent: {
        ...prev.completedContent,
        [skill]: { ...prev.completedContent[skill], [id]: { date: todayStr(), ...meta } },
      },
    }))
  }, [])

  const isContentDone = useCallback((skill, id) => Boolean(blob.completedContent[skill]?.[id]), [blob])

  const reviewVocab = useCallback((wordId, knewIt) => {
    setBlob((prev) => {
      const existing = prev.vocab[wordId] ?? { box: 1, reviews: 0 }
      const box = knewIt ? Math.min(existing.box + 1, 5) : 1
      const nextReview = addDaysStr(LEITNER_INTERVALS[box])
      return {
        ...prev,
        vocab: {
          ...prev.vocab,
          [wordId]: { box, nextReview, lastReviewed: todayStr(), reviews: (existing.reviews ?? 0) + 1 },
        },
      }
    })
  }, [])

  const togglePlanTask = useCallback((taskId, xp = XP_VALUES.planTask) => {
    setBlob((prev) => {
      const next = { ...prev.plan }
      if (next[taskId]) {
        delete next[taskId]
      } else {
        next[taskId] = { date: todayStr(), xp }
      }
      return { ...prev, plan: next }
    })
  }, [])

  const isPlanTaskDone = useCallback((taskId) => Boolean(blob.plan[taskId]), [blob])

  const value = useMemo(() => {
    const vocabWords = Object.entries(blob.vocab)
    const vocabMastered = vocabWords.filter(([, v]) => v.box >= 5).length
    const vocabInProgress = vocabWords.length - vocabMastered

    const bonusXp =
      Object.keys(blob.completedContent.reading).length * XP_VALUES.reading +
      Object.keys(blob.completedContent.listening).length * XP_VALUES.listening +
      Object.keys(blob.completedContent.writing).length * XP_VALUES.writing +
      Object.keys(blob.completedContent.speaking).length * XP_VALUES.speaking +
      vocabWords.reduce((sum, [, v]) => sum + (v.reviews ?? 0) * XP_VALUES.vocabReview, 0) +
      Object.values(blob.plan).reduce((sum, p) => sum + (p.xp ?? XP_VALUES.planTask), 0)

    const practiceDates = new Set([
      ...Object.values(blob.completedContent.reading).map((v) => v.date),
      ...Object.values(blob.completedContent.listening).map((v) => v.date),
      ...Object.values(blob.completedContent.writing).map((v) => v.date),
      ...Object.values(blob.completedContent.speaking).map((v) => v.date),
      ...vocabWords.map(([, v]) => v.lastReviewed),
      ...Object.values(blob.plan).map((v) => v.date),
    ])

    return {
      blob,
      markContentDone,
      isContentDone,
      reviewVocab,
      togglePlanTask,
      isPlanTaskDone,
      bonusXp,
      practiceDates,
      vocabStats: { total: vocabWords.length, mastered: vocabMastered, inProgress: vocabInProgress },
      XP_VALUES,
      todayStr,
    }
  }, [blob, markContentDone, isContentDone, reviewVocab, togglePlanTask, isPlanTaskDone])

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider')
  return ctx
}
