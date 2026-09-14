import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Headphones } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { UnsavedBadge } from '../shared/UnsavedBadge.jsx'
import { useLogs } from '../../lib/LogsContext.jsx'

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
            <CartesianGrid strokeDasharray="3 3" stroke="#282f3a" />
            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} />
            <YAxis domain={[0, 10]} tick={{ fill: '#64748b', fontSize: 11 }} />
            <Tooltip contentStyle={{ background: '#161a20', border: '1px solid #282f3a', borderRadius: 8, fontSize: 12 }} labelStyle={{ color: '#e2e8f0' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
            <Bar dataKey="S1" stackId="a" fill="#38bdf8" radius={[0, 0, 0, 0]} />
            <Bar dataKey="S2" stackId="a" fill="#818cf8" />
            <Bar dataKey="S3" stackId="a" fill="#c084fc" />
            <Bar dataKey="S4" stackId="a" fill="#f472b6" radius={[3, 3, 0, 0]} />
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
