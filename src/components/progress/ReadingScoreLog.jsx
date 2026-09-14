import { useLogs } from '../../lib/LogsContext.jsx'
import { ReadingAccuracyByType } from '../reading/ReadingAccuracyByType.jsx'
import { ReadingScoreForm } from '../reading/ReadingScoreForm.jsx'
import { ReadingErrorLog } from '../reading/ReadingErrorLog.jsx'

export function ReadingScoreLog() {
  const { data } = useLogs()

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-base font-semibold text-slate-100">Reading Score Log</h3>
        <p className="text-sm text-slate-500">Track accuracy by question type and log the root cause of every miss (for mock tests).</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ReadingScoreForm />
        <ReadingAccuracyByType entries={data.readingEntries} />
      </div>

      <ReadingErrorLog />
    </div>
  )
}
