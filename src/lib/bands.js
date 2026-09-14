// IELTS band-score helpers.
// Official rounding rule: average the 4 criteria, then round to the nearest
// 0.5, rounding .25 up to the next half-band and .75 up to the next whole band.

export function roundBand(value) {
  return Math.round(value * 2) / 2
}

export function averageBand(criteria) {
  const values = Object.values(criteria).filter((v) => typeof v === 'number')
  if (values.length === 0) return 0
  const avg = values.reduce((sum, v) => sum + v, 0) / values.length
  return roundBand(avg)
}

// Tailwind-safe color classes keyed by how close a band is to target.
export function bandDeltaColor(current, target) {
  if (current >= target) return 'text-emerald-400'
  if (current >= target - 0.5) return 'text-amber-400'
  return 'text-rose-400'
}

export function formatBand(band) {
  if (typeof band !== 'number') return '—'
  return band.toFixed(1)
}
