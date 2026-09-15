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
import { CHART_GRID_STROKE, CHART_AXIS_TICK, CHART_TOOLTIP_STYLE, CHART_TOOLTIP_LABEL } from '../../lib/chartTheme.js'

export function MockTestProgress({ mockTests, targetOverall }) {
  const chartData = [...mockTests]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((t) => ({ date: t.date, label: t.label, band: t.overallBand }))

  return (
    <Card title="Mock Test Progression" icon={TrendingUp}>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
            <XAxis dataKey="date" tick={CHART_AXIS_TICK} />
            <YAxis domain={[4, 9]} tick={CHART_AXIS_TICK} />
            <ReferenceLine y={targetOverall} stroke="#6b4423" strokeDasharray="4 3" label={{ value: 'Target', fill: '#6b4423', fontSize: 11, position: 'right' }} />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} labelStyle={CHART_TOOLTIP_LABEL} />
            <Line type="monotone" dataKey="band" stroke="#a2571d" strokeWidth={2.5} dot={{ r: 4, fill: '#a2571d' }} />
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
