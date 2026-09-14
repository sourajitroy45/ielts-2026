import { useMemo, useState } from 'react'
import { PenLine } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { Field, BandSelect } from '../shared/Field.jsx'
import { CopyJsonButton } from '../shared/CopyJsonButton.jsx'
import { averageBand } from '../../lib/bands.js'
import { useLogs } from '../../lib/LogsContext.jsx'

const CRITERIA = [
  { key: 'tr', label: 'Task Response (TR)' },
  { key: 'cc', label: 'Coherence & Cohesion (CC)' },
  { key: 'lr', label: 'Lexical Resource (LR)' },
  { key: 'gra', label: 'Grammatical Range & Accuracy (GRA)' },
]

export function WritingScoreForm({ module }) {
  const { addEntry } = useLogs()
  const [task, setTask] = useState('task1')
  const [prompt, setPrompt] = useState('')
  const [notes, setNotes] = useState('')
  const [scores, setScores] = useState({ tr: 6.0, cc: 6.0, lr: 6.0, gra: 6.0 })

  const band = useMemo(() => averageBand(scores), [scores])

  const entry = {
    id: `w-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    module,
    task,
    prompt,
    ...scores,
    notes,
  }

  function handleLog() {
    addEntry('writingEntries', entry)
  }

  const task1Label = module === 'academic' ? 'Task 1 — Visual data description' : 'Task 1 — Letter'

  return (
    <Card title="Log a Writing Score" icon={PenLine}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Task">
          <select className="input" value={task} onChange={(e) => setTask(e.target.value)}>
            <option value="task1">{task1Label}</option>
            <option value="task2">Task 2 — Essay</option>
          </select>
        </Field>
        <Field label="Prompt / topic">
          <input className="input" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g. Line graph on energy consumption" />
        </Field>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CRITERIA.map(({ key, label }) => (
          <Field key={key} label={label.split(' (')[0]}>
            <BandSelect value={scores[key]} onChange={(v) => setScores((s) => ({ ...s, [key]: v }))} />
          </Field>
        ))}
      </div>

      <div className="mt-4">
        <Field label="Notes / diagnostic feedback">
          <textarea className="input min-h-[70px]" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What to fix next time..." />
        </Field>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg border border-base-700 bg-base-850 px-4 py-3">
        <div className="text-sm text-slate-400">
          Computed band (avg of TR/CC/LR/GRA, IELTS rounding):
        </div>
        <div className="text-2xl font-bold text-amber-400">{band.toFixed(1)}</div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn-primary" onClick={handleLog}>
          Add to this session
        </button>
        <CopyJsonButton value={entry} label="Copy JSON → writingEntries" />
      </div>
    </Card>
  )
}
