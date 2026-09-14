import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { Field } from '../shared/Field.jsx'
import { CopyJsonButton } from '../shared/CopyJsonButton.jsx'
import { UnsavedBadge } from '../shared/UnsavedBadge.jsx'
import { useLogs } from '../../lib/LogsContext.jsx'

export function ReadingErrorLog() {
  const { data, addEntry, isUnsaved } = useLogs()
  const [questionType, setQuestionType] = useState('')
  const [rootCause, setRootCause] = useState('')
  const [notes, setNotes] = useState('')

  const entry = {
    id: `re-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    questionType,
    rootCause,
    notes,
  }

  function handleAdd() {
    if (!rootCause.trim()) return
    addEntry('readingErrorLog', entry)
    setQuestionType('')
    setRootCause('')
    setNotes('')
  }

  const sorted = [...data.readingErrorLog].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <Card title="Error Log — Root Causes" icon={AlertTriangle}>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Question type">
          <input className="input" value={questionType} onChange={(e) => setQuestionType(e.target.value)} placeholder="e.g. Matching Headings" />
        </Field>
        <Field label="Root cause">
          <input className="input" value={rootCause} onChange={(e) => setRootCause(e.target.value)} placeholder="Why did I miss this?" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Notes">
            <input className="input" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What to do differently" />
          </Field>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button className="btn-primary" onClick={handleAdd}>Add to this session</button>
        <CopyJsonButton value={entry} label="Copy JSON → readingErrorLog" />
      </div>

      <div className="space-y-2 border-t border-base-700 pt-4">
        {sorted.length === 0 ? (
          <p className="text-sm text-slate-500">No errors logged yet.</p>
        ) : (
          sorted.map((e) => (
            <div key={e.id} className="rounded-lg border border-base-700 bg-base-850 p-3 text-sm">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-semibold text-slate-200">{e.questionType || 'Unspecified'}</span>
                <span className="flex items-center gap-2 text-xs text-slate-500">
                  {isUnsaved('readingErrorLog', e.id) && <UnsavedBadge />}
                  {e.date}
                </span>
              </div>
              <p className="text-xs text-rose-400">{e.rootCause}</p>
              {e.notes && <p className="mt-1 text-xs text-slate-500">{e.notes}</p>}
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
