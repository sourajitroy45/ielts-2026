import { useLogs } from '../../lib/LogsContext.jsx'
import { useNavigation } from '../../lib/NavigationContext.jsx'
import { CountdownWidget } from './CountdownWidget.jsx'
import { GamificationHeader } from './GamificationHeader.jsx'
import { TodayPlanCard } from './TodayPlanCard.jsx'
import { QuickLinks } from './QuickLinks.jsx'
import { Card } from '../shared/Card.jsx'
import { BandPill } from '../shared/BandPill.jsx'
import { ListChecks, Target } from 'lucide-react'

export function Overview() {
  const { data } = useLogs()
  const { setActive } = useNavigation()
  const { profile, mockTests, studyLog } = data

  const latestMock = [...mockTests].sort((a, b) => b.date.localeCompare(a.date))[0]
  const recentStudy = [...studyLog].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)
  const skills = ['listening', 'reading', 'writing', 'speaking']

  return (
    <div className="flex flex-col gap-5">
      <GamificationHeader data={data} />

      <QuickLinks />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TodayPlanCard />
        </div>
        <CountdownWidget targetDateStr={profile.targetTestDate} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card
          title="Band Snapshot"
          icon={Target}
          action={
            <button className="btn-secondary !px-2 !py-1 text-xs" onClick={() => setActive('progress')}>
              Full progress
            </button>
          }
        >
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-slate-400">Overall</span>
            <span className="flex items-center gap-2">
              <BandPill band={latestMock?.overallBand} target={profile.targetBandOverall} />
              <span className="text-xs text-slate-500">/ target {profile.targetBandOverall.toFixed(1)}</span>
            </span>
          </div>
          <div className="space-y-2">
            {skills.map((s) => (
              <div key={s} className="flex items-center justify-between text-xs">
                <span className="capitalize text-slate-400">{s}</span>
                <BandPill band={latestMock?.[s]} target={profile.targetBands[s]} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Activity" icon={ListChecks} className="lg:col-span-2">
          {recentStudy.length === 0 ? (
            <p className="text-sm text-slate-500">No study log entries yet — complete a task from today's plan to get started.</p>
          ) : (
            <ul className="space-y-3">
              {recentStudy.map((entry, i) => (
                <li key={i} className="flex items-start justify-between gap-2 text-sm">
                  <div>
                    <div className="text-slate-200">{entry.activity}</div>
                    <div className="text-xs text-slate-500">{entry.date} · {entry.minutes}min</div>
                  </div>
                  <span className="pill bg-amber-500/10 text-amber-400">+{entry.xp} XP</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
