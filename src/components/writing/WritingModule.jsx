import { useMemo, useState } from 'react'
import { useLogs } from '../../lib/LogsContext.jsx'
import { ModuleToggle } from '../shared/ModuleToggle.jsx'
import { WritingScoreForm } from './WritingScoreForm.jsx'
import { WritingEntryList } from './WritingEntryList.jsx'

export function WritingModule() {
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
          <h2 className="text-lg font-bold text-slate-100">Writing</h2>
          <p className="text-sm text-slate-500">
            {module === 'academic'
              ? 'Task 1: visual data description (graph / chart / diagram / map). Task 2: essay.'
              : 'Task 1: formal / semi-formal / informal letter. Task 2: essay.'}
          </p>
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
