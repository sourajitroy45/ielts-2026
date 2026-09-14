export function Card({ title, icon: Icon, action, children, className = '' }) {
  return (
    <div className={`card p-5 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && (
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-300">
              {Icon && <Icon size={16} className="text-amber-400" />}
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
