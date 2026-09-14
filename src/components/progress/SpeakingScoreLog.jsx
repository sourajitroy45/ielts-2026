import { SpeakingEntryForm } from '../speaking/SpeakingEntryForm.jsx'
import { SpeakingEntryList } from '../speaking/SpeakingEntryList.jsx'

export function SpeakingScoreLog() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-base font-semibold text-slate-100">Speaking Score Log</h3>
        <p className="text-sm text-slate-500">Log transcripts by part and score against the 4 official criteria (for mock tests).</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SpeakingEntryForm />
        <SpeakingEntryList />
      </div>
    </div>
  )
}
