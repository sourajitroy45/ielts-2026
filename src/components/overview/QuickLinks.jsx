import { BookMarked, BookOpen, Headphones, Mic, PenLine } from 'lucide-react'
import { useNavigation } from '../../lib/NavigationContext.jsx'

const LINKS = [
  { key: 'writing', label: 'Writing', icon: PenLine, color: 'text-amber-400 bg-amber-500/10' },
  { key: 'reading', label: 'Reading', icon: BookOpen, color: 'text-terracotta-400 bg-terracotta-500/10' },
  { key: 'listening', label: 'Listening', icon: Headphones, color: 'text-olive-400 bg-olive-500/10' },
  { key: 'speaking', label: 'Speaking', icon: Mic, color: 'text-clay-400 bg-clay-500/10' },
  { key: 'vocabulary', label: 'Vocabulary', icon: BookMarked, color: 'text-sage-400 bg-sage-500/10' },
]

export function QuickLinks() {
  const { setActive } = useNavigation()
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {LINKS.map(({ key, label, icon: Icon, color }) => (
        <button
          key={key}
          onClick={() => setActive(key)}
          className="card flex flex-col items-center gap-2 p-4 transition-colors hover:border-amber-500/40"
        >
          <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>
            <Icon size={18} />
          </span>
          <span className="text-xs font-medium text-slate-300">{label}</span>
        </button>
      ))}
    </div>
  )
}
