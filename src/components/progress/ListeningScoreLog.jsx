import { useLogs } from '../../lib/LogsContext.jsx'
import { ListeningScoreForm } from '../listening/ListeningScoreForm.jsx'
import { ListeningTracker } from '../listening/ListeningTracker.jsx'

export function ListeningScoreLog() {
  const { data } = useLogs()

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-base font-semibold text-slate-100">Listening Score Log</h3>
        <p className="text-sm text-slate-500">Track section-by-section scores from real mock tests.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ListeningScoreForm />
        <ListeningTracker entries={data.listeningEntries} />
      </div>
    </div>
  )
}
