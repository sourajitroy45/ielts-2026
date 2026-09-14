import { useState } from 'react'
import { ChevronDown, ChevronRight, ScrollText } from 'lucide-react'
import { WRITING_BAND_DESCRIPTORS } from '../../content/bandDescriptors.js'

// Official IELTS Band 9 vs Band 7 language, side by side, so self-assessment
// is calibrated against the real descriptors rather than a gut feeling.
export function BandDescriptorPanel() {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-lg border border-base-700 bg-base-850">
      <button className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-xs font-semibold text-slate-300" onClick={() => setOpen((o) => !o)}>
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <ScrollText size={14} className="text-amber-400" />
        Band 9 vs. Band 7 — official descriptor reference
      </button>
      {open && (
        <div className="space-y-3 border-t border-base-700 px-3 py-3">
          {Object.values(WRITING_BAND_DESCRIPTORS).map((crit) => (
            <div key={crit.label}>
              <div className="mb-1 text-xs font-semibold text-slate-200">{crit.label}</div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 p-2 text-[11px] text-slate-400">
                  <span className="font-semibold text-emerald-400">Band 9 — </span>{crit[9]}
                </div>
                <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-2 text-[11px] text-slate-400">
                  <span className="font-semibold text-amber-400">Band 7 — </span>{crit[7]}
                </div>
              </div>
            </div>
          ))}
          <p className="text-[10px] text-slate-500">Source: official IELTS Writing Band Descriptors (public version, ielts.org).</p>
        </div>
      )}
    </div>
  )
}
