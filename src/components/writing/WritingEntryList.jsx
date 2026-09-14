import { ClipboardList } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { UnsavedBadge } from '../shared/UnsavedBadge.jsx'
import { averageBand, formatBand } from '../../lib/bands.js'
import { useLogs } from '../../lib/LogsContext.jsx'

const TASK_LABELS = { task1: 'Task 1', task2: 'Task 2' }

export function WritingEntryList({ module, entries }) {
  const { isUnsaved } = useLogs()
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <Card title={`${module === 'academic' ? 'Academic' : 'General Training'} Entries`} icon={ClipboardList}>
      {sorted.length === 0 ? (
        <p className="text-sm text-slate-500">No entries logged for this track yet.</p>
      ) : (
        <div className="space-y-3">
          {sorted.map((e) => {
            const band = averageBand(e)
            return (
              <div key={e.id} className="rounded-lg border border-base-700 bg-base-850 p-3.5">
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                    {TASK_LABELS[e.task] ?? e.task}
                    {isUnsaved('writingEntries', e.id) && <UnsavedBadge />}
                  </div>
                  <span className="pill bg-amber-500/10 font-mono text-amber-400">{formatBand(band)}</span>
                </div>
                <p className="mb-2 text-xs text-slate-400">{e.prompt || '(no prompt recorded)'}</p>
                <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
                  <span>TR {formatBand(e.tr)}</span>
                  <span>CC {formatBand(e.cc)}</span>
                  <span>LR {formatBand(e.lr)}</span>
                  <span>GRA {formatBand(e.gra)}</span>
                  <span className="ml-auto">{e.date}</span>
                </div>
                {e.notes && <p className="border-t border-base-700 pt-2 text-xs text-slate-400">{e.notes}</p>}
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}
