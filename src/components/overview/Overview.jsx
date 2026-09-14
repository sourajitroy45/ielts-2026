import { useLogs } from '../../lib/LogsContext.jsx'
import { CountdownWidget } from './CountdownWidget.jsx'
import { GamificationHeader } from './GamificationHeader.jsx'
import { BandRadarChart } from './BandRadarChart.jsx'
import { MockTestProgress } from './MockTestProgress.jsx'
import { Card } from '../shared/Card.jsx'
import { ListChecks } from 'lucide-react'

export function Overview() {
  const { data } = useLogs()
  const { profile, mockTests, studyLog } = data

  const latestMock = [...mockTests].sort((a, b) => b.date.localeCompare(a.date))[0]
  const recentStudy = [...studyLog].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)

  return (
    <div className="flex flex-col gap-5">
      <GamificationHeader data={data} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <CountdownWidget targetDateStr={profile.targetTestDate} />
        <div className="lg:col-span-2">
          <BandRadarChart
            latestMock={latestMock}
            targetBands={profile.targetBands}
            targetOverall={profile.targetBandOverall}
            latestOverall={latestMock?.overallBand}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MockTestProgress mockTests={mockTests} targetOverall={profile.targetBandOverall} />
        </div>
        <Card title="Recent Study Log" icon={ListChecks}>
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
        </Card>
      </div>
    </div>
  )
}
