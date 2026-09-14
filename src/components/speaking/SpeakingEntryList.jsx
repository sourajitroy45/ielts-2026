import { MessagesSquare } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { UnsavedBadge } from '../shared/UnsavedBadge.jsx'
import { SPEAKING_PARTS } from '../shared/PartToggle.jsx'
import { averageBand, formatBand } from '../../lib/bands.js'
import { useLogs } from '../../lib/LogsContext.jsx'

const PART_LABELS = Object.fromEntries(SPEAKING_PARTS.map((p) => [p.key, p.label]))

export function SpeakingEntryList() {
  const { data, isUnsaved } = useLogs()
  const sorted = [...data.speakingEntries].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <Card title="Session Log" icon={MessagesSquare}>
      {sorted.length === 0 ? (
        <p className="text-sm text-slate-500">No speaking sessions logged yet.</p>
      ) : (
        <div className="space-y-3">
          {sorted.map((e) => {
            const band = averageBand(e)
            return (
              <div key={e.id} className="rounded-lg border border-base-700 bg-base-850 p-3.5">
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                    {PART_LABELS[e.part] ?? e.part}
                    {isUnsaved('speakingEntries', e.id) && <UnsavedBadge />}
                  </div>
                  <span className="pill bg-amber-500/10 font-mono text-amber-400">{formatBand(band)}</span>
                </div>
                {e.transcript && <p className="mb-2 line-clamp-3 text-xs text-slate-400">{e.transcript}</p>}
                <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
                  <span>FC {formatBand(e.fc)}</span>
                  <span>LR {formatBand(e.lr)}</span>
                  <span>GRA {formatBand(e.gra)}</span>
                  <span>Pron {formatBand(e.pron)}</span>
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
