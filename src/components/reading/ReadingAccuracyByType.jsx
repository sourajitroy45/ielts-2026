import { BarChart3 } from 'lucide-react'
import { Card } from '../shared/Card.jsx'

export function ReadingAccuracyByType({ entries }) {
  const byType = {}
  for (const e of entries) {
    if (!byType[e.questionType]) byType[e.questionType] = { correct: 0, total: 0, attempts: 0 }
    byType[e.questionType].correct += e.correct
    byType[e.questionType].total += e.total
    byType[e.questionType].attempts += 1
  }
  const rows = Object.entries(byType).sort((a, b) => b[1].total - a[1].total)

  return (
    <Card title="Accuracy by Question Type" icon={BarChart3}>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-500">No reading attempts logged yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.map(([type, stats]) => {
            const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
            return (
              <div key={type}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-slate-300">{type}</span>
                  <span className="font-mono text-slate-400">
                    {stats.correct}/{stats.total} · {pct}% · {stats.attempts} attempt{stats.attempts > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-base-800">
                  <div
                    className={`h-full rounded-full ${pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}
