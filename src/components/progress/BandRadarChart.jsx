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
import { CHART_GRID_STROKE, CHART_AXIS_TICK, CHART_AXIS_TICK_SM, CHART_TOOLTIP_STYLE, CHART_TOOLTIP_LABEL, CHART_LEGEND_STYLE } from '../../lib/chartTheme.js'

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
            <PolarGrid stroke={CHART_GRID_STROKE} />
            <PolarAngleAxis dataKey="skill" tick={{ ...CHART_AXIS_TICK, fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 9]} tick={CHART_AXIS_TICK_SM} />
            <Radar name="Target" dataKey="Target" stroke="#a89572" fill="#a89572" fillOpacity={0.15} strokeDasharray="4 3" />
            <Radar name="Current" dataKey="Current" stroke="#6b4423" fill="#6b4423" fillOpacity={0.35} />
            <Legend wrapperStyle={{ ...CHART_LEGEND_STYLE, fontSize: 12 }} />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} labelStyle={CHART_TOOLTIP_LABEL} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
