import { useMemo, useState } from 'react'
import { Clock, Play, RotateCcw } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { Field, BandSelect } from '../shared/Field.jsx'
import { CopyJsonButton } from '../shared/CopyJsonButton.jsx'
import { Task1Chart } from './Task1Chart.jsx'
import { BandDescriptorPanel } from './BandDescriptorPanel.jsx'
import { averageBand } from '../../lib/bands.js'
import { useCountdown } from '../../lib/useCountdown.js'
import { useProgress } from '../../lib/progressStore.jsx'
import { TASK2_ESSAY_TYPES } from '../../content/bandDescriptors.js'

const CRITERIA = [
  { key: 'tr', label: 'TR' },
  { key: 'cc', label: 'CC' },
  { key: 'lr', label: 'LR' },
  { key: 'gra', label: 'GRA' },
]

export function PromptRunner({ prompt, onDone }) {
  const { markContentDone } = useProgress()
  const [essay, setEssay] = useState('')
  const [selfScoring, setSelfScoring] = useState(false)
  const [scores, setScores] = useState({ tr: 6.0, cc: 6.0, lr: 6.0, gra: 6.0 })
  const timer = useCountdown(prompt.targetMinutes * 60)

  const wordCount = useMemo(() => (essay.trim() ? essay.trim().split(/\s+/).length : 0), [essay])
  const band = useMemo(() => averageBand(scores), [scores])

  const logEntry = {
    id: `w-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    module: prompt.module,
    task: prompt.task,
    prompt: prompt.title,
    ...scores,
    notes: `Practice session · ${wordCount} words · ${prompt.targetMinutes}min target`,
  }

  function finishPractice() {
    markContentDone('writing', prompt.id, { band })
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card title={prompt.title}>
        {prompt.essayType && (
          <span className="pill mb-2 inline-block bg-amber-500/10 text-amber-400">{TASK2_ESSAY_TYPES[prompt.essayType]}</span>
        )}
        <p className="mb-3 text-sm text-slate-300">{prompt.prompt}</p>
        {prompt.chart && <Task1Chart chart={prompt.chart} />}
        <ul className="mt-3 list-inside list-disc space-y-1 text-xs text-slate-500">
          {prompt.guidance.map((g, i) => <li key={i}>{g}</li>)}
        </ul>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-base-700 bg-base-850 p-3">
          <Clock size={16} className="text-amber-400" />
          <span className="font-mono text-lg text-slate-100">{timer.label}</span>
          {!timer.running ? (
            <button className="btn-secondary !px-2 !py-1 text-xs" onClick={timer.start}><Play size={12} /> Start</button>
          ) : (
            <button className="btn-secondary !px-2 !py-1 text-xs" onClick={timer.pause}>Pause</button>
          )}
          <button className="btn-secondary !px-2 !py-1 text-xs" onClick={() => timer.reset()}><RotateCcw size={12} /></button>
          <span className="ml-auto text-xs text-slate-500">Target: {prompt.targetWords} words / {prompt.targetMinutes} min</span>
        </div>
      </Card>

      <Card title="Your Response">
        <textarea
          className="input min-h-[280px] font-serif"
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="Write your response here..."
        />
        <div className="mt-2 text-xs text-slate-500">{wordCount} words</div>

        {!selfScoring ? (
          <button className="btn-primary mt-4" onClick={() => setSelfScoring(true)}>Finished — self-assess</button>
        ) : (
          <div className="mt-4 space-y-3 border-t border-base-700 pt-4">
            <p className="text-xs text-slate-500">Rate your own response against the 4 criteria (or use a tutor's feedback if you have it).</p>
            <BandDescriptorPanel />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {CRITERIA.map(({ key, label }) => (
                <Field key={key} label={label}>
                  <BandSelect value={scores[key]} onChange={(v) => setScores((s) => ({ ...s, [key]: v }))} />
                </Field>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-lg border border-base-700 bg-base-850 px-4 py-3">
              <span className="text-sm text-slate-400">Computed band</span>
              <span className="text-2xl font-bold text-amber-400">{band.toFixed(1)}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="btn-primary" onClick={() => { finishPractice(); onDone() }}>Mark practice complete</button>
              <CopyJsonButton value={logEntry} label="Copy JSON → Progress / writingEntries" />
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
