import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { TrendingUp } from 'lucide-react'
import { Card } from '../shared/Card.jsx'

export function MockTestProgress({ mockTests, targetOverall }) {
  const chartData = [...mockTests]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((t) => ({ date: t.date, label: t.label, band: t.overallBand }))

  return (
    <Card title="Mock Test Progression" icon={TrendingUp}>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#282f3a" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis domain={[4, 9]} tick={{ fill: '#64748b', fontSize: 11 }} />
            <ReferenceLine y={targetOverall} stroke="#f59e0b" strokeDasharray="4 3" label={{ value: 'Target', fill: '#f59e0b', fontSize: 11, position: 'right' }} />
            <Tooltip
              contentStyle={{ background: '#161a20', border: '1px solid #282f3a', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Line type="monotone" dataKey="band" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 4, fill: '#38bdf8' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-2 space-y-1 text-xs text-slate-500">
        {chartData.map((t) => (
          <li key={t.date} className="flex justify-between">
            <span>{t.label}</span>
            <span className="font-mono text-slate-300">{t.band.toFixed(1)} · {t.date}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
