import { SpeakingEntryForm } from './SpeakingEntryForm.jsx'
import { SpeakingEntryList } from './SpeakingEntryList.jsx'

export function SpeakingModule() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-100">Speaking</h2>
        <p className="text-sm text-slate-500">Log transcripts by part and score against the 4 official criteria.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SpeakingEntryForm />
        <SpeakingEntryList />
      </div>
    </div>
  )
}
