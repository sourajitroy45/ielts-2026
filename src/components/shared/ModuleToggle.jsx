export function ModuleToggle({ value, onChange }) {
  const options = [
    { key: 'academic', label: 'Academic' },
    { key: 'general', label: 'General Training' },
  ]
  return (
    <div className="inline-flex rounded-lg border border-base-700 bg-base-850 p-1">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
            value === opt.key
              ? 'bg-amber-500 text-base-950'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
