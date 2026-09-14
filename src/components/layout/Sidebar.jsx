import { BarChart3, BookMarked, BookOpen, CalendarDays, Headphones, LayoutDashboard, Mic, PenLine, Target } from 'lucide-react'

const NAV_ITEMS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'studyplan', label: 'Study Plan', icon: CalendarDays },
  { key: 'vocabulary', label: 'Vocabulary', icon: BookMarked },
  { key: 'writing', label: 'Writing', icon: PenLine },
  { key: 'reading', label: 'Reading', icon: BookOpen },
  { key: 'listening', label: 'Listening', icon: Headphones },
  { key: 'speaking', label: 'Speaking', icon: Mic },
  { key: 'progress', label: 'Progress', icon: BarChart3 },
]

export function Sidebar({ active, onSelect }) {
  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-base-700 bg-base-900 px-3 py-5">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
          <Target size={18} />
        </div>
        <div>
          <div className="text-sm font-bold leading-none text-slate-100">IELTS 2026</div>
          <div className="text-[11px] text-slate-500">prep operating system</div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-amber-500/12 text-amber-400'
                  : 'text-slate-400 hover:bg-base-850 hover:text-slate-200'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          )
        })}
      </nav>

      <div className="rounded-lg border border-base-700 bg-base-850 px-3 py-2.5 text-[11px] text-slate-500">
        Practice pages are for learning. <span className="text-slate-400">Progress</span> tracks real test scores.
        Data source: <span className="text-slate-400">data/logs.json</span> + your browser's local storage.
      </div>
    </aside>
  )
}
