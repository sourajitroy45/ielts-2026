import { useState } from 'react'
import { Check, Clipboard } from 'lucide-react'

// Copies a log entry as pretty-printed JSON so it can be pasted straight
// into the matching array in data/logs.json to persist it.
export function CopyJsonButton({ value, label = 'Copy JSON for logs.json' }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const text = JSON.stringify(value, null, 2) + ','
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently,
      // the button just won't confirm.
    }
  }

  return (
    <button type="button" onClick={handleCopy} className="btn-secondary">
      {copied ? <Check size={14} className="text-emerald-400" /> : <Clipboard size={14} />}
      {copied ? 'Copied' : label}
    </button>
  )
}
