import { AlertCircle } from 'lucide-react'

export function UnsavedBadge() {
  return (
    <span className="pill gap-1 bg-amber-500/10 text-amber-400" title="Added this session only — copy to data/logs.json to persist across reloads">
      <AlertCircle size={12} />
      unsaved
    </span>
  )
}
