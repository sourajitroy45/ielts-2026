import { useState } from 'react'
import { CheckCircle2, Headphones } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { LISTENING_SCRIPTS } from '../../content/listeningScripts.js'
import { useProgress } from '../../lib/progressStore.jsx'
import { ScriptRunner } from './ScriptRunner.jsx'
import { MapLabelingDrill } from './MapLabelingDrill.jsx'

export function ListeningModule() {
  const { isContentDone, blob } = useProgress()
  const [activeId, setActiveId] = useState(null)
  const active = LISTENING_SCRIPTS.find((s) => s.id === activeId)

  if (active) {
    return <ScriptRunner script={active} onDone={() => setActiveId(null)} />
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-100">Listening Practice</h2>
        <p className="text-sm text-slate-500">
          Scripts are read aloud in-browser (text-to-speech) to simulate real listening practice, covering all 4
          section types plus a spatial/direction map-labeling drill.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {LISTENING_SCRIPTS.map((s) => {
          const done = isContentDone('listening', s.id)
          const result = blob.completedContent.listening[s.id]
          return (
            <button key={s.id} onClick={() => setActiveId(s.id)} className="text-left">
              <Card className="h-full transition-colors hover:border-amber-500/40">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Headphones size={16} className="text-indigo-400" />
                    <span className="font-semibold text-slate-100">{s.title}</span>
                  </div>
                  {done && <CheckCircle2 size={16} className="text-emerald-400" />}
                </div>
                <p className="mt-2 text-xs text-slate-500">Section {s.section} · {s.type} · {s.questions.length} questions</p>
                {done && <p className="mt-1 text-xs text-emerald-400">Last score: {result.correct}/{result.total}</p>}
              </Card>
            </button>
          )
        })}
      </div>

      <MapLabelingDrill />
    </div>
  )
}
