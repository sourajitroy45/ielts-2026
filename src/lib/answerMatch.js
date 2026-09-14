// Shared answer-grading logic for Reading and Listening practice runners.
// Deliberately stricter than a raw substring check — a naive
// `a.includes(b) || b.includes(a)` marks "18" correct against answer "8"
// (since "18" contains "8"). Numeric answers now require an exact match;
// text answers require whole-word containment, not any substring.

export function normalizeAnswer(s) {
  return (s ?? '')
    .toString()
    .toLowerCase()
    .replace(/[$,]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function isAnswerCorrect(question, userAnswer) {
  const a = normalizeAnswer(userAnswer)
  const b = normalizeAnswer(question.answer)
  if (!a || !b) return false
  if (a === b) return true

  const bIsNumeric = /^\d+(\.\d+)?$/.test(b)
  if (bIsNumeric) return false // exact match already checked above; no partial credit for numbers

  const bWords = b.split(' ').filter(Boolean)
  return bWords.every((w) => new RegExp(`\\b${escapeRegExp(w)}\\b`, 'i').test(a))
}
