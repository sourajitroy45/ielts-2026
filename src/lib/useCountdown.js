import { useEffect, useRef, useState } from 'react'

export function useCountdown(initialSeconds) {
  const [remaining, setRemaining] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current)
          setRunning(false)
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running])

  function start() {
    if (remaining <= 0) setRemaining(initialSeconds)
    setRunning(true)
  }
  function pause() {
    setRunning(false)
  }
  function reset(seconds = initialSeconds) {
    setRunning(false)
    setRemaining(seconds)
  }

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  const label = `${minutes}:${String(seconds).padStart(2, '0')}`

  return { remaining, running, start, pause, reset, label }
}
