import { useState } from 'react'
import { BarChart3, Headphones, Mic, PenLine, TrendingUp } from 'lucide-react'
import { useLogs } from '../../lib/LogsContext.jsx'
import { BandRadarChart } from './BandRadarChart.jsx'
import { MockTestProgress } from './MockTestProgress.jsx'
import { WritingScoreLog } from './WritingScoreLog.jsx'
import { ReadingScoreLog } from './ReadingScoreLog.jsx'
import { ListeningScoreLog } from './ListeningScoreLog.jsx'
import { SpeakingScoreLog } from './SpeakingScoreLog.jsx'

const TABS = [
  { key: 'mocks', label: 'Mock Tests', icon: TrendingUp },
  { key: 'writing', label: 'Writing', icon: PenLine },
  { key: 'reading', label: 'Reading', icon: BarChart3 },
  { key: 'listening', label: 'Listening', icon: Headphones },
  { key: 'speaking', label: 'Speaking', icon: Mic },
]

export function ProgressModule() {
  const { data } = useLogs()
  const [tab, setTab] = useState('mocks')
  const latestMock = [...data.mockTests].sort((a, b) => b.date.localeCompare(a.date))[0]

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-100">Progress</h2>
        <p className="text-sm text-slate-500">
          The record of your <em>real</em> test results — full mock tests and evaluated practice scores. This is
          separate from the practice pages, which are for learning; log scores here once something has actually
          been assessed (by you, a tutor, or a mock test).
        </p>
      </div>

      <div className="inline-flex w-fit flex-wrap rounded-lg border border-base-700 bg-base-850 p-1">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              tab === key ? 'bg-amber-500 text-base-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon size={13} /> {label}
          </button>
        ))}
      </div>

      {tab === 'mocks' && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <BandRadarChart
            latestMock={latestMock}
            targetBands={data.profile.targetBands}
            targetOverall={data.profile.targetBandOverall}
            latestOverall={latestMock?.overallBand}
          />
          <MockTestProgress mockTests={data.mockTests} targetOverall={data.profile.targetBandOverall} />
        </div>
      )}
      {tab === 'writing' && <WritingScoreLog />}
      {tab === 'reading' && <ReadingScoreLog />}
      {tab === 'listening' && <ListeningScoreLog />}
      {tab === 'speaking' && <SpeakingScoreLog />}
    </div>
  )
}
