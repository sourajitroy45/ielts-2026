import { CalendarClock } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { daysUntil } from '../../lib/gamification.js'

export function CountdownWidget({ targetDateStr }) {
  const days = daysUntil(targetDateStr)
  const label = days > 1 ? 'days to go' : days === 1 ? 'day to go' : days === 0 ? 'Test day!' : 'days overdue'
  const displayDate = new Date(`${targetDateStr}T00:00:00`).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Card title="Test Day Countdown" icon={CalendarClock} className="flex flex-col justify-between">
      <div className="flex items-end gap-2">
        <span className="text-5xl font-extrabold tabular-nums text-amber-400">
          {Math.max(days, 0)}
        </span>
        <span className="pb-1.5 text-sm font-medium text-slate-400">{label}</span>
      </div>
      <p className="mt-3 text-xs text-slate-500">Target test date: {displayDate}</p>
    </Card>
  )
}
