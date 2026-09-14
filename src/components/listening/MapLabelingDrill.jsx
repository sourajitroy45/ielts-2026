import { useMemo, useState } from 'react'
import { CheckCircle2, Map as MapIcon, RotateCcw, XCircle } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { CopyJsonButton } from '../shared/CopyJsonButton.jsx'
import { useLogs } from '../../lib/LogsContext.jsx'

// A self-contained direction/spatial drill in the style of an IELTS Listening
// map-labeling task: place the correct option letter at each numbered point.
const OPTIONS = [
  { letter: 'A', label: 'Reception Desk' },
  { letter: 'B', label: "Children's Section" },
  { letter: 'C', label: 'Reading Room' },
  { letter: 'D', label: 'Computer Lab' },
  { letter: 'E', label: 'Café' },
  { letter: 'F', label: 'Reference Section' },
]

// Points positioned on a simple schematic floor plan (viewBox 0 0 320 220).
const POINTS = [
  { n: 1, x: 60, y: 50, answer: 'A' },
  { n: 2, x: 250, y: 50, answer: 'B' },
  { n: 3, x: 60, y: 160, answer: 'F' },
  { n: 4, x: 250, y: 160, answer: 'D' },
  { n: 5, x: 155, y: 105, answer: 'C' },
]

export function MapLabelingDrill() {
  const { addEntry } = useLogs()
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState(false)

  const correctCount = useMemo(
    () => POINTS.filter((p) => answers[p.n] === p.answer).length,
    [answers]
  )

  function handleCheck() {
    setChecked(true)
  }

  function handleReset() {
    setAnswers({})
    setChecked(false)
  }

  const entry = {
    id: `md-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    mapName: 'Town Library Floor Plan',
    correct: correctCount,
    total: POINTS.length,
    notes: '',
  }

  return (
    <Card title="Map Labeling Drill" icon={MapIcon}>
      <p className="mb-4 text-xs text-slate-500">
        Town Library Floor Plan — pick the correct location for each numbered point, then check your answers.
        (Swap in a real audio-described map from your prep materials when you're ready.)
      </p>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <svg viewBox="0 0 320 220" className="w-full rounded-lg border border-base-700 bg-base-850">
          <rect x="10" y="10" width="300" height="200" rx="6" fill="none" stroke="#3a4453" strokeWidth="1.5" />
          <line x1="160" y1="10" x2="160" y2="210" stroke="#282f3a" strokeWidth="1" />
          <line x1="10" y1="110" x2="310" y2="110" stroke="#282f3a" strokeWidth="1" />
          {POINTS.map((p) => {
            const state = checked ? (answers[p.n] === p.answer ? 'correct' : 'wrong') : 'idle'
            const fill = state === 'correct' ? '#10b981' : state === 'wrong' ? '#f43f5e' : '#f59e0b'
            return (
              <g key={p.n}>
                <circle cx={p.x} cy={p.y} r="12" fill={fill} fillOpacity="0.2" stroke={fill} strokeWidth="1.5" />
                <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={fill}>
                  {p.n}
                </text>
              </g>
            )
          })}
        </svg>

        <div className="space-y-2">
          {POINTS.map((p) => {
            const isCorrect = answers[p.n] === p.answer
            return (
              <div key={p.n} className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-base-800 text-xs font-bold text-slate-300">
                  {p.n}
                </span>
                <select
                  className="input"
                  value={answers[p.n] ?? ''}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [p.n]: e.target.value }))}
                >
                  <option value="" disabled>Choose a letter…</option>
                  {OPTIONS.map((o) => (
                    <option key={o.letter} value={o.letter}>{o.letter}. {o.label}</option>
                  ))}
                </select>
                {checked && (isCorrect ? <CheckCircle2 size={18} className="text-emerald-400" /> : <XCircle size={18} className="text-rose-400" />)}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button className="btn-primary" onClick={handleCheck}>Check Answers</button>
        <button className="btn-secondary" onClick={handleReset}>
          <RotateCcw size={14} /> Reset
        </button>
        {checked && (
          <span className="pill bg-amber-500/10 font-mono text-amber-400">
            {correctCount}/{POINTS.length} correct
          </span>
        )}
        {checked && (
          <>
            <button className="btn-secondary" onClick={() => addEntry('listeningMapDrills', entry)}>
              Log this result
            </button>
            <CopyJsonButton value={entry} label="Copy JSON → listeningMapDrills" />
          </>
        )}
      </div>
    </Card>
  )
}
