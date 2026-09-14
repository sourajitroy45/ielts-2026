import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { Radar as RadarIcon } from 'lucide-react'
import { Card } from '../shared/Card.jsx'

export function BandRadarChart({ latestMock, targetBands, targetOverall, latestOverall }) {
  const skills = ['listening', 'reading', 'writing', 'speaking']
  const chartData = skills.map((skill) => ({
    skill: skill[0].toUpperCase() + skill.slice(1),
    Current: latestMock?.[skill] ?? 0,
    Target: targetBands?.[skill] ?? 0,
  }))

  return (
    <Card title="Target vs. Estimated Band" icon={RadarIcon}>
      <div className="mb-3 flex items-center gap-4 text-xs text-slate-400">
        <span>
          Overall now: <span className="font-semibold text-slate-200">{latestOverall?.toFixed(1) ?? '—'}</span>
        </span>
        <span>
          Overall target: <span className="font-semibold text-amber-400">{targetOverall?.toFixed(1) ?? '—'}</span>
        </span>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} outerRadius="75%">
            <PolarGrid stroke="#282f3a" />
            <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 9]} tick={{ fill: '#64748b', fontSize: 10 }} />
            <Radar name="Target" dataKey="Target" stroke="#64748b" fill="#64748b" fillOpacity={0.15} strokeDasharray="4 3" />
            <Radar name="Current" dataKey="Current" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.35} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
            <Tooltip
              contentStyle={{ background: '#161a20', border: '1px solid #282f3a', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
