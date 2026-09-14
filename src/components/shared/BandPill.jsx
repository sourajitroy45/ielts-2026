import { formatBand } from '../../lib/bands.js'

export function BandPill({ band, target }) {
  let color = 'bg-slate-500/15 text-slate-300'
  if (typeof band === 'number' && typeof target === 'number') {
    if (band >= target) color = 'bg-emerald-500/15 text-emerald-400'
    else if (band >= target - 0.5) color = 'bg-amber-500/15 text-amber-400'
    else color = 'bg-rose-500/15 text-rose-400'
  }
  return <span className={`pill font-mono ${color}`}>{formatBand(band)}</span>
}
