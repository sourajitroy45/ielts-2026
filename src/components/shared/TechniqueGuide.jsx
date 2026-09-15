import { useState } from 'react'
import { ChevronDown, ChevronRight, Clock, Zap } from 'lucide-react'
import { TECHNIQUES } from '../../content/techniques.js'

// Embedded "faster techniques" study material for a section — collapsed by
// default so it doesn't crowd the practice list, but always one click away
// right where you're about to practice. See content/techniques.js for the
// research basis.
export function TechniqueGuide({ skill, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const data = TECHNIQUES[skill]
  if (!data) return null

  return (
    <div className="card overflow-hidden !p-0">
      <button className="flex w-full items-center gap-2 px-4 py-3 text-left" onClick={() => setOpen((o) => !o)}>
        {open ? <ChevronDown size={16} className="text-slate-500" /> : <ChevronRight size={16} className="text-slate-500" />}
        <Zap size={16} className="text-amber-400" />
        <span className="text-sm font-semibold text-slate-100">{data.title}</span>
        <span className="ml-auto text-xs text-slate-500">{open ? 'hide' : 'study material'}</span>
      </button>

      {open && (
        <div className="space-y-4 border-t border-base-700 px-4 py-4">
          <div className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2.5 text-xs text-slate-400">
            <Clock size={14} className="mt-0.5 shrink-0 text-amber-400" />
            <span><span className="font-semibold text-amber-400">Timing — </span>{data.timeManagement}</span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {data.items.map((t) => (
              <div key={t.name} className="rounded-lg border border-base-700 bg-base-850 p-3">
                <div className="mb-1 text-sm font-semibold text-slate-200">{t.name}</div>
                <p className="text-xs leading-relaxed text-slate-400">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
