import { useState } from 'react'
import { CheckCircle2, Lightbulb, MessageCircle, Play, RotateCcw } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { MicRecorder } from './MicRecorder.jsx'
import { SpeakingBandDescriptorPanel } from './SpeakingBandDescriptorPanel.jsx'
import { useCountdown } from '../../lib/useCountdown.js'
import { useProgress } from '../../lib/progressStore.jsx'

const PARTS = [
  { key: 'part1', label: 'Part 1 — Interview' },
  { key: 'part2', label: 'Part 2 — Cue Card' },
  { key: 'part3', label: 'Part 3 — Discussion' },
]

export function CueCardRunner({ set, onDone }) {
  const { markContentDone } = useProgress()
  const [part, setPart] = useState('part1')
  const prep = useCountdown(set.part2.prepSeconds)
  const speak = useCountdown(set.part2.speakSeconds)

  function finish() {
    markContentDone('speaking', set.id, {})
    onDone()
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-100">{set.theme}</h2>
        <div className="inline-flex rounded-lg border border-base-700 bg-base-850 p-1">
          {PARTS.map((p) => (
            <button
              key={p.key}
              onClick={() => setPart(p.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${part === p.key ? 'bg-amber-500 text-base-950' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {set.band9Tip && (
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2.5 text-xs text-slate-300">
          <Lightbulb size={14} className="mt-0.5 shrink-0 text-amber-400" />
          <span><span className="font-semibold text-amber-400">Band 9 tip — </span>{set.band9Tip}</span>
        </div>
      )}
      <SpeakingBandDescriptorPanel />

      {part === 'part1' && (
        <Card title="Part 1 — Interview Questions" icon={MessageCircle}>
          <ul className="space-y-3">
            {set.part1.map((q, i) => (
              <li key={i} className="text-sm text-slate-200">{i + 1}. {q}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">Answer each aloud in 2-3 sentences, as you would to an examiner.</p>
          <div className="mt-3"><MicRecorder /></div>
        </Card>
      )}

      {part === 'part2' && (
        <Card title="Part 2 — Cue Card">
          <p className="mb-2 font-semibold text-slate-100">{set.part2.title}</p>
          <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-slate-400">
            {set.part2.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-base-700 bg-base-850 p-3">
              <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">Prep time ({set.part2.prepSeconds}s)</div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xl text-slate-100">{prep.label}</span>
                {!prep.running ? <button className="btn-secondary !px-2 !py-1 text-xs" onClick={prep.start}><Play size={12} /></button> : <button className="btn-secondary !px-2 !py-1 text-xs" onClick={prep.pause}>Pause</button>}
                <button className="btn-secondary !px-2 !py-1 text-xs" onClick={() => prep.reset()}><RotateCcw size={12} /></button>
              </div>
            </div>
            <div className="rounded-lg border border-base-700 bg-base-850 p-3">
              <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">Speak time ({Math.round(set.part2.speakSeconds / 60)} min)</div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xl text-slate-100">{speak.label}</span>
                {!speak.running ? <button className="btn-secondary !px-2 !py-1 text-xs" onClick={speak.start}><Play size={12} /></button> : <button className="btn-secondary !px-2 !py-1 text-xs" onClick={speak.pause}>Pause</button>}
                <button className="btn-secondary !px-2 !py-1 text-xs" onClick={() => speak.reset()}><RotateCcw size={12} /></button>
              </div>
            </div>
          </div>

          <div className="mt-4"><MicRecorder /></div>
        </Card>
      )}

      {part === 'part3' && (
        <Card title="Part 3 — Discussion Questions" icon={MessageCircle}>
          <ul className="space-y-3">
            {set.part3.map((q, i) => (
              <li key={i} className="text-sm text-slate-200">{i + 1}. {q}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">These are more abstract — aim for developed answers with reasons and examples.</p>
          <div className="mt-3"><MicRecorder /></div>
        </Card>
      )}

      <div className="flex gap-2">
        <button className="btn-primary" onClick={finish}>
          <CheckCircle2 size={14} /> Mark this set complete
        </button>
      </div>
    </div>
  )
}
