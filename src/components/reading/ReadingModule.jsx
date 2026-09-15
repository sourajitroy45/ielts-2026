import { useState } from 'react'
import { BookOpen, CheckCircle2 } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { TechniqueGuide } from '../shared/TechniqueGuide.jsx'
import { READING_PASSAGES } from '../../content/readingPassages.js'
import { useProgress } from '../../lib/progressStore.jsx'
import { PassageRunner } from './PassageRunner.jsx'

export function ReadingModule() {
  const { isContentDone, blob } = useProgress()
  const [activeId, setActiveId] = useState(null)
  const active = READING_PASSAGES.find((p) => p.id === activeId)

  if (active) {
    return <PassageRunner passage={active} onDone={() => setActiveId(null)} />
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-100">Reading Practice</h2>
        <p className="text-sm text-slate-500">
          Pick a passage, answer the comprehension questions, and check your score. Covers True/False/Not Given,
          multiple choice, and summary/sentence completion.
        </p>
      </div>

      <TechniqueGuide skill="reading" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {READING_PASSAGES.map((p) => {
          const done = isContentDone('reading', p.id)
          const result = blob.completedContent.reading[p.id]
          return (
            <button key={p.id} onClick={() => setActiveId(p.id)} className="text-left">
              <Card className="h-full transition-colors hover:border-amber-500/40">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-terracotta-400" />
                    <span className="font-semibold text-slate-100">{p.title}</span>
                  </div>
                  {done && <CheckCircle2 size={16} className="text-emerald-400" />}
                </div>
                <p className="mt-2 text-xs text-slate-500">{p.questions.length} questions · ~{Math.round(p.text.split(' ').length / 200 * 60)}s read</p>
                {done && <p className="mt-1 text-xs text-emerald-400">Last score: {result.correct}/{result.total}</p>}
              </Card>
            </button>
          )
        })}
      </div>
    </div>
  )
}
