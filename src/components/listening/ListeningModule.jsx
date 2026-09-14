import { useLogs } from '../../lib/LogsContext.jsx'
import { ListeningScoreForm } from './ListeningScoreForm.jsx'
import { ListeningTracker } from './ListeningTracker.jsx'
import { MapLabelingDrill } from './MapLabelingDrill.jsx'

export function ListeningModule() {
  const { data } = useLogs()

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-100">Listening</h2>
        <p className="text-sm text-slate-500">Track section-by-section scores and drill spatial/direction question types.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ListeningScoreForm />
        <ListeningTracker entries={data.listeningEntries} />
      </div>

      <MapLabelingDrill />
    </div>
  )
}
