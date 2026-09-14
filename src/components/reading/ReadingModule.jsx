import { useLogs } from '../../lib/LogsContext.jsx'
import { ReadingAccuracyByType } from './ReadingAccuracyByType.jsx'
import { ReadingScoreForm } from './ReadingScoreForm.jsx'
import { ReadingErrorLog } from './ReadingErrorLog.jsx'

export function ReadingModule() {
  const { data } = useLogs()

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-100">Reading</h2>
        <p className="text-sm text-slate-500">Track accuracy by question type and log the root cause of every miss.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ReadingScoreForm />
        <ReadingAccuracyByType entries={data.readingEntries} />
      </div>

      <ReadingErrorLog />
    </div>
  )
}
