// XP, level, and streak are always *derived* from data/logs.json rather than
// stored as separate counters — that way the numbers can never drift out of
// sync with the underlying log entries.

const XP_PER_LEVEL = 500
const XP_PER_MOCK_TEST = 100

function toLocalISODate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function addDays(d, days) {
  const copy = new Date(d)
  copy.setDate(copy.getDate() + days)
  return copy
}

export function computeXp(data) {
  const studyXp = (data.studyLog ?? []).reduce((sum, e) => sum + (e.xp ?? 0), 0)
  const mockXp = (data.mockTests ?? []).length * XP_PER_MOCK_TEST
  return studyXp + mockXp
}

export function computeLevel(xp) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1
  const xpIntoLevel = xp % XP_PER_LEVEL
  return { level, xpIntoLevel, xpForNextLevel: XP_PER_LEVEL, progress: xpIntoLevel / XP_PER_LEVEL }
}

export function computeStreak(studyLog, today = new Date()) {
  const uniqueDates = [...new Set((studyLog ?? []).map((e) => e.date))].sort().reverse()
  if (uniqueDates.length === 0) return 0

  const todayStr = toLocalISODate(today)
  const yesterdayStr = toLocalISODate(addDays(today, -1))
  if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) return 0

  let streak = 1
  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const cur = new Date(uniqueDates[i])
    const prev = new Date(uniqueDates[i + 1])
    const diffDays = Math.round((cur - prev) / 86400000)
    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }
  return streak
}

export function daysUntil(targetDateStr, today = new Date()) {
  const target = new Date(`${targetDateStr}T00:00:00`)
  const start = new Date(toLocalISODate(today) + 'T00:00:00')
  const diffMs = target - start
  return Math.ceil(diffMs / 86400000)
}
