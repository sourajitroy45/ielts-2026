import { READING_PASSAGES } from '../content/readingPassages.js'
import { LISTENING_SCRIPTS } from '../content/listeningScripts.js'
import { WRITING_PROMPTS } from '../content/writingPrompts.js'
import { SPEAKING_SETS } from '../content/speakingCueCards.js'
import { VOCAB_SETS } from '../content/vocabulary.js'

// Deterministic day-by-day plan generator: today -> target test date. Same
// inputs always produce the same task IDs, so completion state (stored by
// task ID in localStorage) survives across app reloads without a database.

const CYCLE = ['reading', 'listening', 'writing', 'speaking', 'mixed-rl', 'mixed-ws', 'review']

function toISO(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function pick(pool, i) {
  return pool[((i % pool.length) + pool.length) % pool.length]
}

function buildTasks(dateStr, dayNum, type, offset) {
  const vocabSet = pick(VOCAB_SETS, offset)
  const vocabTask = { id: `${dateStr}-vocab`, label: `Review vocab set: ${vocabSet.title}`, xp: 10, link: { page: 'vocabulary', setId: vocabSet.id } }

  switch (type) {
    case 'reading': {
      const p = pick(READING_PASSAGES, Math.floor(offset / CYCLE.length))
      return { title: 'Reading Focus', tasks: [
        { id: `${dateStr}-reading`, label: `Complete reading passage: "${p.title}"`, xp: 15, link: { page: 'reading', id: p.id } },
        vocabTask,
      ] }
    }
    case 'listening': {
      const s = pick(LISTENING_SCRIPTS, Math.floor(offset / CYCLE.length))
      return { title: 'Listening Focus', tasks: [
        { id: `${dateStr}-listening`, label: `Complete listening drill: "${s.title}"`, xp: 15, link: { page: 'listening', id: s.id } },
        vocabTask,
      ] }
    }
    case 'writing': {
      const w = pick(WRITING_PROMPTS, Math.floor(offset / CYCLE.length))
      return { title: 'Writing Focus', tasks: [
        { id: `${dateStr}-writing`, label: `Write: "${w.title}" (${w.module === 'academic' ? 'Academic' : 'General'} ${w.task === 'task1' ? 'Task 1' : 'Task 2'})`, xp: 20, link: { page: 'writing', id: w.id } },
        vocabTask,
      ] }
    }
    case 'speaking': {
      const sp = pick(SPEAKING_SETS, Math.floor(offset / CYCLE.length))
      return { title: 'Speaking Focus', tasks: [
        { id: `${dateStr}-speaking`, label: `Practice speaking set: "${sp.theme}"`, xp: 20, link: { page: 'speaking', id: sp.id } },
        vocabTask,
      ] }
    }
    case 'mixed-rl': {
      const p = pick(READING_PASSAGES, Math.floor(offset / CYCLE.length) + 3)
      const s = pick(LISTENING_SCRIPTS, Math.floor(offset / CYCLE.length) + 3)
      return { title: 'Mixed: Reading + Listening', tasks: [
        { id: `${dateStr}-mixed-r`, label: `Quick reading: "${p.title}"`, xp: 10, link: { page: 'reading', id: p.id } },
        { id: `${dateStr}-mixed-l`, label: `Quick listening: "${s.title}"`, xp: 10, link: { page: 'listening', id: s.id } },
        vocabTask,
      ] }
    }
    case 'mixed-ws': {
      const w = pick(WRITING_PROMPTS, Math.floor(offset / CYCLE.length) + 3)
      const sp = pick(SPEAKING_SETS, Math.floor(offset / CYCLE.length) + 3)
      return { title: 'Mixed: Writing + Speaking', tasks: [
        { id: `${dateStr}-mixed-w`, label: `Quick outline: "${w.title}"`, xp: 10, link: { page: 'writing', id: w.id } },
        { id: `${dateStr}-mixed-s`, label: `Part 1 warm-up: "${sp.theme}"`, xp: 10, link: { page: 'speaking', id: sp.id } },
        vocabTask,
      ] }
    }
    case 'review':
      return { title: 'Review Day', tasks: [
        { id: `${dateStr}-review-errors`, label: 'Revisit your weakest item in the Progress error log', xp: 15, link: { page: 'progress' } },
        vocabTask,
        { id: `${dateStr}-review-rest`, label: 'Light day — consolidate, don\'t cram new material', xp: 5, link: null },
      ] }
    case 'mock-test':
      return { title: 'Mock Test Day', tasks: [
        { id: `${dateStr}-mock`, label: 'Take a full or sectional mock test and log the result in Progress', xp: 50, link: { page: 'progress' } },
        vocabTask,
      ] }
    case 'light-review':
      return { title: 'Final Stretch — Light Review', tasks: [
        { id: `${dateStr}-light-vocab`, label: 'Light vocab review (10-15 words only)', xp: 10, link: { page: 'vocabulary' } },
        { id: `${dateStr}-light-logistics`, label: 'Confirm test center, ID documents, and arrival time', xp: 5, link: null },
        { id: `${dateStr}-light-rest`, label: 'Prioritize sleep — no new content this close to the test', xp: 5, link: null },
      ] }
    case 'test-day':
      return { title: 'Test Day', tasks: [
        { id: `${dateStr}-test-day`, label: 'Good luck — arrive early, bring your ID, and trust your preparation.', xp: 0, link: null },
      ] }
    default:
      return { title: 'Study Day', tasks: [vocabTask] }
  }
}

export function generateStudyPlan(targetDateStr, startDate = new Date()) {
  const start = new Date(startDate)
  start.setHours(0, 0, 0, 0)
  const target = new Date(`${targetDateStr}T00:00:00`)
  if (target < start) return []

  const days = []
  let offset = 0
  let dayNum = 0
  const cursor = new Date(start)

  while (cursor <= target) {
    dayNum++
    const dateStr = toISO(cursor)
    const daysToTarget = Math.round((target - cursor) / 86400000)
    const isTestDay = dateStr === targetDateStr
    let type
    if (isTestDay) type = 'test-day'
    else if (daysToTarget <= 1) type = 'light-review'
    else if (dayNum % 10 === 0) type = 'mock-test'
    else type = CYCLE[offset % CYCLE.length]

    const { title, tasks } = buildTasks(dateStr, dayNum, type, offset)
    days.push({ date: dateStr, dayNum, type, title, tasks })

    if (!isTestDay && daysToTarget > 1 && dayNum % 10 !== 0) offset++
    cursor.setDate(cursor.getDate() + 1)
  }
  return days
}
