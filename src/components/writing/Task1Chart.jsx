import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CHART_COLORS, CHART_GRID_STROKE, CHART_AXIS_TICK, CHART_TOOLTIP_STYLE, CHART_TOOLTIP_LABEL, CHART_LEGEND_STYLE } from '../../lib/chartTheme.js'

export function Task1Chart({ chart }) {
  if (!chart) return null

  if (chart.type === 'pie') {
    return (
      <div className="h-64 w-full rounded-lg border border-base-700 bg-base-850 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chart.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label={({ name, value }) => `${name} ${value}${chart.unit ?? ''}`}>
              {chart.data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} labelStyle={CHART_TOOLTIP_LABEL} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const ChartComp = chart.type === 'line' ? LineChart : BarChart

  return (
    <div className="h-64 w-full rounded-lg border border-base-700 bg-base-850 p-2">
      <ResponsiveContainer width="100%" height="100%">
        <ChartComp data={chart.data} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
          <XAxis dataKey={chart.xKey} tick={CHART_AXIS_TICK} />
          <YAxis tick={CHART_AXIS_TICK} unit={chart.unit} />
          <Tooltip contentStyle={CHART_TOOLTIP_STYLE} labelStyle={CHART_TOOLTIP_LABEL} />
          <Legend wrapperStyle={CHART_LEGEND_STYLE} />
          {chart.series.map((s, i) =>
            chart.type === 'line' ? (
              <Line key={s} type="monotone" dataKey={s} stroke={CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={2} dot={{ r: 3 }} />
            ) : (
              <Bar key={s} dataKey={s} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            )
          )}
        </ChartComp>
      </ResponsiveContainer>
    </div>
  )
}
