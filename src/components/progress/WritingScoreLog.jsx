import { useMemo, useState } from 'react'
import { useLogs } from '../../lib/LogsContext.jsx'
import { ModuleToggle } from '../shared/ModuleToggle.jsx'
import { WritingScoreForm } from '../writing/WritingScoreForm.jsx'
import { WritingEntryList } from '../writing/WritingEntryList.jsx'

export function WritingScoreLog() {
  const { data } = useLogs()
  const [module, setModule] = useState('academic')

  const entries = useMemo(
    () => data.writingEntries.filter((e) => e.module === module),
    [data.writingEntries, module]
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-100">Writing Score Log</h3>
          <p className="text-sm text-slate-500">Log a real essay score against the 4 criteria (for mock tests or evaluated practice).</p>
        </div>
        <ModuleToggle value={module} onChange={setModule} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <WritingScoreForm module={module} />
        <WritingEntryList module={module} entries={entries} />
      </div>
    </div>
  )
}
