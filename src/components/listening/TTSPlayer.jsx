import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Square, Volume2 } from 'lucide-react'

const SUPPORTED = typeof window !== 'undefined' && 'speechSynthesis' in window

// mode 'exam': single play at natural speed, no scrubbing — matches the real
// test (audio plays once). mode 'practice': replay + adjustable speed, for
// building familiarity before you're ready for exam conditions.
export function TTSPlayer({ text, mode = 'exam' }) {
  const [state, setState] = useState('idle') // idle | playing | paused | played
  const [rate, setRate] = useState(1.0)
  const utterRef = useRef(null)

  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  function play() {
    if (!SUPPORTED) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = mode === 'exam' ? 1.0 : rate
    utter.onend = () => setState(mode === 'exam' ? 'played' : 'idle')
    utter.onerror = () => setState(mode === 'exam' ? 'played' : 'idle')
    utterRef.current = utter
    window.speechSynthesis.speak(utter)
    setState('playing')
  }

  function pause() {
    window.speechSynthesis.pause()
    setState('paused')
  }

  function resume() {
    window.speechSynthesis.resume()
    setState('playing')
  }

  function stop() {
    window.speechSynthesis.cancel()
    setState(mode === 'exam' && utterRef.current ? 'played' : 'idle')
  }

  if (!SUPPORTED) {
    return (
      <div className="rounded-lg border border-base-700 bg-base-850 p-3 text-xs text-slate-500">
        Your browser doesn't support text-to-speech playback. Switch to Practice Mode and use the transcript
        review after submitting instead.
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-base-700 bg-base-850 p-3">
      <Volume2 size={16} className="text-indigo-400" />

      {state === 'idle' && (
        <button className="btn-primary !px-3 !py-1.5" onClick={play}>
          <Play size={14} /> Play
        </button>
      )}
      {state === 'playing' && (
        <button className="btn-secondary !px-3 !py-1.5" onClick={pause}>
          <Pause size={14} /> Pause
        </button>
      )}
      {state === 'paused' && (
        <button className="btn-primary !px-3 !py-1.5" onClick={resume}>
          <Play size={14} /> Resume
        </button>
      )}
      {(state === 'playing' || state === 'paused') && (
        <button className="btn-secondary !px-3 !py-1.5" onClick={stop}>
          <Square size={14} /> Stop
        </button>
      )}
      {state === 'played' && (
        <span className="pill bg-base-800 text-slate-500">Played — no replay in Exam Mode</span>
      )}

      {mode === 'practice' && (
        <label className="ml-auto flex items-center gap-2 text-xs text-slate-500">
          Speed
          <input type="range" min="0.7" max="1.2" step="0.05" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} />
        </label>
      )}
    </div>
  )
}
