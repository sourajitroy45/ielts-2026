import { useState } from 'react'
import { CheckCircle2, Mic } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { TechniqueGuide } from '../shared/TechniqueGuide.jsx'
import { SPEAKING_SETS } from '../../content/speakingCueCards.js'
import { useProgress } from '../../lib/progressStore.jsx'
import { CueCardRunner } from './CueCardRunner.jsx'

export function SpeakingModule() {
  const { isContentDone } = useProgress()
  const [activeId, setActiveId] = useState(null)
  const active = SPEAKING_SETS.find((s) => s.id === activeId)

  if (active) {
    return <CueCardRunner set={active} onDone={() => setActiveId(null)} />
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-100">Speaking Practice</h2>
        <p className="text-sm text-slate-500">
          Full Part 1 / 2 / 3 sets with prep and speaking timers. Optional mic recording lets you play back and
          self-assess fluency and pace.
        </p>
      </div>

      <TechniqueGuide skill="speaking" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SPEAKING_SETS.map((s) => {
          const done = isContentDone('speaking', s.id)
          return (
            <button key={s.id} onClick={() => setActiveId(s.id)} className="text-left">
              <Card className="h-full transition-colors hover:border-amber-500/40">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Mic size={16} className="text-clay-400" />
                    <span className="font-semibold text-slate-100">{s.theme}</span>
                  </div>
                  {done && <CheckCircle2 size={16} className="text-emerald-400" />}
                </div>
                <p className="mt-2 text-xs text-slate-500">Part 1 ({s.part1.length} Qs) · Part 2 cue card · Part 3 ({s.part3.length} Qs)</p>
              </Card>
            </button>
          )
        })}
      </div>
    </div>
  )
}
