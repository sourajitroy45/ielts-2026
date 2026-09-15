import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Headphones } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { UnsavedBadge } from '../shared/UnsavedBadge.jsx'
import { useLogs } from '../../lib/LogsContext.jsx'
import { CHART_GRID_STROKE, CHART_AXIS_TICK, CHART_TOOLTIP_STYLE, CHART_TOOLTIP_LABEL, CHART_LEGEND_STYLE } from '../../lib/chartTheme.js'

export function ListeningTracker({ entries }) {
  const { isUnsaved } = useLogs()
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date))
  const chartData = sorted.map((e) => ({
    name: e.testName.length > 16 ? e.testName.slice(0, 16) + '…' : e.testName,
    S1: e.sections.s1,
    S2: e.sections.s2,
    S3: e.sections.s3,
    S4: e.sections.s4,
  }))

  return (
    <Card title="Section Score Tracker" icon={Headphones}>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
            <XAxis dataKey="name" tick={{ ...CHART_AXIS_TICK, fontSize: 10 }} />
            <YAxis domain={[0, 10]} tick={CHART_AXIS_TICK} />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} labelStyle={CHART_TOOLTIP_LABEL} />
            <Legend wrapperStyle={CHART_LEGEND_STYLE} />
            <Bar dataKey="S1" stackId="a" fill="#6b4423" radius={[0, 0, 0, 0]} />
            <Bar dataKey="S2" stackId="a" fill="#a2571d" />
            <Bar dataKey="S3" stackId="a" fill="#c2954a" />
            <Bar dataKey="S4" stackId="a" fill="#7a8c4c" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 space-y-2 border-t border-base-700 pt-3">
        {[...sorted].reverse().map((e) => (
          <div key={e.id} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-slate-300">
              {e.testName}
              {isUnsaved('listeningEntries', e.id) && <UnsavedBadge />}
            </span>
            <span className="font-mono text-slate-500">
              S1 {e.sections.s1} · S2 {e.sections.s2} · S3 {e.sections.s3} · S4 {e.sections.s4} ·{' '}
              <span className="text-amber-400">Band {e.band.toFixed(1)}</span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
