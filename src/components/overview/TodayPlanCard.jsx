import { CheckCircle2, Circle, ListTodo } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { useProgress } from '../../lib/progressStore.jsx'
import { useNavigation } from '../../lib/NavigationContext.jsx'
import { generateStudyPlan } from '../../lib/studyPlan.js'
import { useLogs } from '../../lib/LogsContext.jsx'

export function TodayPlanCard() {
  const { data } = useLogs()
  const { isPlanTaskDone, togglePlanTask } = useProgress()
  const { setActive } = useNavigation()
  const [today] = generateStudyPlan(data.profile.targetTestDate)

  if (!today) return null

  const done = today.tasks.filter((t) => isPlanTaskDone(t.id)).length

  return (
    <Card
      title={`Today's Plan — ${today.title}`}
      icon={ListTodo}
      action={
        <button className="btn-secondary !px-2 !py-1 text-xs" onClick={() => setActive('studyplan')}>
          Full plan
        </button>
      }
    >
      <div className="mb-3 text-xs text-slate-500">{done}/{today.tasks.length} tasks complete today</div>
      <div className="space-y-2">
        {today.tasks.map((t) => {
          const isDone = isPlanTaskDone(t.id)
          return (
            <div key={t.id} className="flex items-center gap-2.5">
              <button onClick={() => togglePlanTask(t.id, t.xp)} className="shrink-0">
                {isDone ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Circle size={18} className="text-slate-600" />}
              </button>
              <span className={`flex-1 text-sm ${isDone ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{t.label}</span>
              {t.link?.page && (
                <button className="btn-secondary !px-2 !py-1 text-xs" onClick={() => setActive(t.link.page)}>
                  Go
                </button>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
