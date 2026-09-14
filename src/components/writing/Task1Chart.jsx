import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const COLORS = ['#f59e0b', '#38bdf8', '#a78bfa', '#f472b6', '#34d399']

export function Task1Chart({ chart }) {
  if (!chart) return null
  const ChartComp = chart.type === 'line' ? LineChart : BarChart

  return (
    <div className="h-64 w-full rounded-lg border border-base-700 bg-base-850 p-2">
      <ResponsiveContainer width="100%" height="100%">
        <ChartComp data={chart.data} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#282f3a" />
          <XAxis dataKey={chart.xKey} tick={{ fill: '#64748b', fontSize: 11 }} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} unit={chart.unit} />
          <Tooltip contentStyle={{ background: '#161a20', border: '1px solid #282f3a', borderRadius: 8, fontSize: 12 }} labelStyle={{ color: '#e2e8f0' }} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
          {chart.series.map((s, i) =>
            chart.type === 'line' ? (
              <Line key={s} type="monotone" dataKey={s} stroke={COLORS[i % COLORS.length]} strokeWidth={2} dot={{ r: 3 }} />
            ) : (
              <Bar key={s} dataKey={s} fill={COLORS[i % COLORS.length]} />
            )
          )}
        </ChartComp>
      </ResponsiveContainer>
    </div>
  )
}
