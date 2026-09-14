import { useState } from 'react'
import { ListPlus } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { Field } from '../shared/Field.jsx'
import { CopyJsonButton } from '../shared/CopyJsonButton.jsx'
import { useLogs } from '../../lib/LogsContext.jsx'

const QUESTION_TYPES = [
  'True/False/Not Given',
  'Yes/No/Not Given',
  'Matching Headings',
  'Matching Information',
  'Matching Features',
  'Sentence Completion',
  'Summary Completion',
  'Multiple Choice',
  'Short Answer',
]

export function ReadingScoreForm() {
  const { addEntry } = useLogs()
  const [questionType, setQuestionType] = useState(QUESTION_TYPES[0])
  const [correct, setCorrect] = useState(7)
  const [total, setTotal] = useState(10)
  const [timeMinutes, setTimeMinutes] = useState(15)

  const entry = {
    id: `r-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    questionType,
    correct: Number(correct),
    total: Number(total),
    timeMinutes: Number(timeMinutes),
  }

  return (
    <Card title="Log a Reading Attempt" icon={ListPlus}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Question type">
          <select className="input" value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
            {QUESTION_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Time spent (minutes)">
          <input type="number" min="0" className="input" value={timeMinutes} onChange={(e) => setTimeMinutes(e.target.value)} />
        </Field>
        <Field label="Correct">
          <input type="number" min="0" className="input" value={correct} onChange={(e) => setCorrect(e.target.value)} />
        </Field>
        <Field label="Total questions">
          <input type="number" min="0" className="input" value={total} onChange={(e) => setTotal(e.target.value)} />
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn-primary" onClick={() => addEntry('readingEntries', entry)}>
          Add to this session
        </button>
        <CopyJsonButton value={entry} label="Copy JSON → readingEntries" />
      </div>
    </Card>
  )
}
