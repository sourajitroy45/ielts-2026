import { useMemo, useState } from 'react'
import { Mic } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { Field, BandSelect } from '../shared/Field.jsx'
import { CopyJsonButton } from '../shared/CopyJsonButton.jsx'
import { PartToggle } from '../shared/PartToggle.jsx'
import { averageBand } from '../../lib/bands.js'
import { useLogs } from '../../lib/LogsContext.jsx'

const CRITERIA = [
  { key: 'fc', label: 'Fluency & Coherence' },
  { key: 'lr', label: 'Lexical Resource' },
  { key: 'gra', label: 'Grammatical Range' },
  { key: 'pron', label: 'Pronunciation' },
]

export function SpeakingEntryForm() {
  const { addEntry } = useLogs()
  const [part, setPart] = useState('part1')
  const [transcript, setTranscript] = useState('')
  const [notes, setNotes] = useState('')
  const [scores, setScores] = useState({ fc: 6.0, lr: 6.0, gra: 6.0, pron: 6.0 })

  const band = useMemo(() => averageBand(scores), [scores])

  const entry = {
    id: `s-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    part,
    transcript,
    ...scores,
    notes,
  }

  return (
    <Card title="Log a Speaking Session" icon={Mic}>
      <Field label="Part">
        <PartToggle value={part} onChange={setPart} />
      </Field>

      <div className="mt-4">
        <Field label="Transcript / session notes">
          <textarea
            className="input min-h-[90px]"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste or summarize what you said..."
          />
        </Field>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CRITERIA.map(({ key, label }) => (
          <Field key={key} label={label}>
            <BandSelect value={scores[key]} onChange={(v) => setScores((s) => ({ ...s, [key]: v }))} />
          </Field>
        ))}
      </div>

      <div className="mt-4">
        <Field label="Diagnostic feedback">
          <input className="input" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What to improve next time..." />
        </Field>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg border border-base-700 bg-base-850 px-4 py-3">
        <div className="text-sm text-slate-400">Computed band (avg of FC/LR/GRA/Pronunciation):</div>
        <div className="text-2xl font-bold text-amber-400">{band.toFixed(1)}</div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn-primary" onClick={() => addEntry('speakingEntries', entry)}>
          Add to this session
        </button>
        <CopyJsonButton value={entry} label="Copy JSON → speakingEntries" />
      </div>
    </Card>
  )
}
