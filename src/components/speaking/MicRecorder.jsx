import { useRef, useState } from 'react'
import { AlertCircle, Circle, Square } from 'lucide-react'

const SUPPORTED = typeof window !== 'undefined' && 'MediaRecorder' in window

export function MicRecorder() {
  const [recording, setRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const [error, setError] = useState(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const streamRef = useRef(null)

  async function startRecording() {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      chunksRef.current = []
      const recorder = new MediaRecorder(stream)
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data)
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach((t) => t.stop())
      }
      recorder.start()
      mediaRecorderRef.current = recorder
      setRecording(true)
    } catch {
      setError('Microphone access was denied or is unavailable. You can still practice without recording.')
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  if (!SUPPORTED) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-base-700 bg-base-850 p-3 text-xs text-slate-500">
        <AlertCircle size={14} /> Recording isn't supported in this browser — practice out loud without recording.
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-base-700 bg-base-850 p-3">
      <div className="flex flex-wrap items-center gap-3">
        {!recording ? (
          <button className="btn-primary" onClick={startRecording}>
            <Circle size={12} className="fill-current" /> Record
          </button>
        ) : (
          <button className="btn-secondary" onClick={stopRecording}>
            <Square size={12} className="text-rose-400" /> Stop
          </button>
        )}
        {recording && <span className="flex items-center gap-1 text-xs text-rose-400"><Circle size={8} className="animate-pulse fill-current" /> Recording…</span>}
      </div>
      {error && <p className="mt-2 text-xs text-amber-400">{error}</p>}
      {audioUrl && (
        <audio className="mt-3 w-full" controls src={audioUrl} />
      )}
      <p className="mt-2 text-[11px] text-slate-500">Stored only in this browser tab for self-review — not saved anywhere, and lost on reload.</p>
    </div>
  )
}
