import { useMemo, useState } from 'react'
import { CalendarDays, ChevronDown, ChevronRight, Circle, CheckCircle2 } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { useLogs } from '../../lib/LogsContext.jsx'
import { useProgress } from '../../lib/progressStore.jsx'
import { useNavigation } from '../../lib/NavigationContext.jsx'
import { generateStudyPlan } from '../../lib/studyPlan.js'

const TYPE_COLOR = {
  reading: 'text-sky-400 bg-sky-500/10',
  listening: 'text-indigo-400 bg-indigo-500/10',
  writing: 'text-amber-400 bg-amber-500/10',
  speaking: 'text-pink-400 bg-pink-500/10',
  'mixed-rl': 'text-teal-400 bg-teal-500/10',
  'mixed-ws': 'text-orange-400 bg-orange-500/10',
  review: 'text-slate-400 bg-slate-500/10',
  'mock-test': 'text-rose-400 bg-rose-500/10',
  'light-review': 'text-emerald-400 bg-emerald-500/10',
  'test-day': 'text-amber-300 bg-amber-500/20',
}

function DayCard({ day, isToday, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  const { isPlanTaskDone, togglePlanTask } = useProgress()
  const { setActive } = useNavigation()

  const total = day.tasks.length
  const done = day.tasks.filter((t) => isPlanTaskDone(t.id)).length
  const allDone = total > 0 && done === total

  return (
    <div className={`rounded-xl border ${isToday ? 'border-amber-500/50 bg-amber-500/[0.04]' : 'border-base-700 bg-base-850'}`}>
      <button className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left" onClick={() => setOpen((o) => !o)}>
        <div className="flex items-center gap-3">
          {open ? <ChevronDown size={16} className="text-slate-500" /> : <ChevronRight size={16} className="text-slate-500" />}
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              {day.title}
              {isToday && <span className="pill bg-amber-500 text-base-950">Today</span>}
            </div>
            <div className="text-xs text-slate-500">{day.date} · Day {day.dayNum}</div>
          </div>
        </div>
        <span className={`pill ${allDone ? 'bg-emerald-500/15 text-emerald-400' : 'bg-base-800 text-slate-400'}`}>
          {done}/{total}
        </span>
      </button>

      {open && (
        <div className="space-y-2 border-t border-base-700 px-4 py-3">
          {day.tasks.map((t) => {
            const done = isPlanTaskDone(t.id)
            return (
              <div key={t.id} className="flex items-center gap-2.5">
                <button onClick={() => togglePlanTask(t.id, t.xp)} className="shrink-0">
                  {done ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Circle size={18} className="text-slate-600" />}
                </button>
                <span className={`flex-1 text-sm ${done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{t.label}</span>
                {t.xp > 0 && <span className="text-xs font-mono text-amber-400">+{t.xp}</span>}
                {t.link?.page && (
                  <button className="btn-secondary !px-2 !py-1 text-xs" onClick={() => setActive(t.link.page)}>
                    Go
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function StudyPlanModule() {
  const { data } = useLogs()
  const { isPlanTaskDone } = useProgress()
  const plan = useMemo(() => generateStudyPlan(data.profile.targetTestDate), [data.profile.targetTestDate])

  const allTasks = plan.flatMap((d) => d.tasks)
  const doneCount = allTasks.filter((t) => isPlanTaskDone(t.id)).length
  const pct = allTasks.length > 0 ? Math.round((doneCount / allTasks.length) * 100) : 0

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-100">Study Plan</h2>
        <p className="text-sm text-slate-500">
          A systematic day-by-day plan from today to your test date, cycling through Reading, Listening, Writing,
          Speaking, mixed drills, review days, and periodic mock tests.
        </p>
      </div>

      <Card title="Overall Plan Progress" icon={CalendarDays}>
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          <span>{doneCount} / {allTasks.length} tasks complete</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-base-800">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400" style={{ width: `${pct}%` }} />
        </div>
      </Card>

      <div className="space-y-2.5">
        {plan.map((day, i) => (
          <DayCard key={day.date} day={day} isToday={i === 0} defaultOpen={i === 0} />
        ))}
      </div>
    </div>
  )
}
