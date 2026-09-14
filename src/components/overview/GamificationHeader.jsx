import { Flame, Sparkles, Trophy } from 'lucide-react'
import { computeLevel, computeStreak, computeXp } from '../../lib/gamification.js'
import { useProgress } from '../../lib/progressStore.jsx'

export function GamificationHeader({ data }) {
  const { bonusXp, practiceDates } = useProgress()
  const xp = computeXp(data, bonusXp)
  const { level, xpIntoLevel, xpForNextLevel, progress } = computeLevel(xp)
  const streak = computeStreak(data.studyLog, new Date(), [...practiceDates])

  return (
    <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
          <Trophy size={22} />
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Level</div>
          <div className="text-2xl font-bold leading-none text-slate-100">{level}</div>
        </div>
      </div>

      <div className="flex-1 sm:max-w-xs">
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Sparkles size={12} className="text-amber-400" /> {xp} XP total
          </span>
          <span>{xpIntoLevel} / {xpForNextLevel} to next level</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-base-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>

      <div className="stat-chip">
        <Flame size={18} className={streak > 0 ? 'text-orange-400' : 'text-slate-600'} />
        <div>
          <div className="text-lg font-bold leading-none text-slate-100">{streak}</div>
          <div className="text-[11px] text-slate-500">day streak</div>
        </div>
      </div>
    </div>
  )
}
