const PARTS = [
  { key: 'part1', label: 'Part 1 — Interview' },
  { key: 'part2', label: 'Part 2 — Cue Card' },
  { key: 'part3', label: 'Part 3 — Discussion' },
]

export function PartToggle({ value, onChange }) {
  return (
    <div className="inline-flex flex-wrap rounded-lg border border-base-700 bg-base-850 p-1">
      {PARTS.map((p) => (
        <button
          key={p.key}
          onClick={() => onChange(p.key)}
          className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
            value === p.key ? 'bg-amber-500 text-base-950' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}

export const SPEAKING_PARTS = PARTS
