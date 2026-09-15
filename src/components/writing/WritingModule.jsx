import { useMemo, useState } from 'react'
import { CheckCircle2, PenLine } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { ModuleToggle } from '../shared/ModuleToggle.jsx'
import { TechniqueGuide } from '../shared/TechniqueGuide.jsx'
import { WRITING_PROMPTS } from '../../content/writingPrompts.js'
import { useProgress } from '../../lib/progressStore.jsx'
import { PromptRunner } from './PromptRunner.jsx'

export function WritingModule() {
  const { isContentDone, blob } = useProgress()
  const [module, setModule] = useState('academic')
  const [activeId, setActiveId] = useState(null)

  const prompts = useMemo(() => WRITING_PROMPTS.filter((p) => p.module === module), [module])
  const active = WRITING_PROMPTS.find((p) => p.id === activeId)

  if (active) {
    return <PromptRunner prompt={active} onDone={() => setActiveId(null)} />
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-100">Writing Practice</h2>
          <p className="text-sm text-slate-500">Timed writing prompts with a self-assessment rubric at the end.</p>
        </div>
        <ModuleToggle value={module} onChange={setModule} />
      </div>

      <TechniqueGuide skill="writing" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {prompts.map((p) => {
          const done = isContentDone('writing', p.id)
          const result = blob.completedContent.writing[p.id]
          return (
            <button key={p.id} onClick={() => setActiveId(p.id)} className="text-left">
              <Card className="h-full transition-colors hover:border-amber-500/40">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <PenLine size={16} className="text-amber-400" />
                    <span className="font-semibold text-slate-100">{p.title}</span>
                  </div>
                  {done && <CheckCircle2 size={16} className="text-emerald-400" />}
                </div>
                <p className="mt-2 text-xs text-slate-500">{p.task === 'task1' ? 'Task 1' : 'Task 2'} · ~{p.targetWords} words · {p.targetMinutes} min</p>
                {done && result?.band && <p className="mt-1 text-xs text-emerald-400">Self-assessed band: {result.band.toFixed(1)}</p>}
              </Card>
            </button>
          )
        })}
      </div>
    </div>
  )
}
