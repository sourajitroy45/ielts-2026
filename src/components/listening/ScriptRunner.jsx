import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { useProgress } from '../../lib/progressStore.jsx'
import { isAnswerCorrect } from '../../lib/answerMatch.js'
import { TTSPlayer } from './TTSPlayer.jsx'

export function ScriptRunner({ script, onDone }) {
  const { markContentDone } = useProgress()
  const [mode, setMode] = useState('exam')
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)

  const score = script.questions.filter((q) => isAnswerCorrect(q, answers[q.id])).length

  function handleSubmit() {
    setSubmitted(true)
    markContentDone('listening', script.id, { correct: score, total: script.questions.length, mode })
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card title={`${script.title} — Section ${script.section}`}>
        <p className="mb-3 text-xs text-slate-500">{script.type}.</p>

        <div className="mb-3 inline-flex rounded-lg border border-base-700 bg-base-850 p-1">
          {[
            { key: 'exam', label: 'Exam Mode' },
            { key: 'practice', label: 'Practice Mode' },
          ].map((m) => (
            <button
              key={m.key}
              disabled={submitted}
              onClick={() => setMode(m.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                mode === m.key ? 'bg-amber-500 text-base-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="mb-3 text-[11px] text-slate-500">
          {mode === 'exam'
            ? 'Plays once at natural speed, like the real test. No pausing to re-listen, no transcript until after you submit.'
            : 'Replay as many times as you like and adjust playback speed — use this while you\'re still building familiarity.'}
        </p>

        <TTSPlayer key={script.id + mode} text={script.text} mode={mode} />

        {submitted && (
          <>
            <button className="btn-secondary mt-3 !px-2 !py-1 text-xs" onClick={() => setShowTranscript((s) => !s)}>
              {showTranscript ? 'Hide transcript' : 'Show transcript (review)'}
            </button>
            {showTranscript && <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-300">{script.text}</p>}
          </>
        )}
      </Card>

      <Card title="Questions">
        <div className="space-y-4">
          {script.questions.map((q, i) => {
            const correct = submitted && isAnswerCorrect(q, answers[q.id])
            return (
              <div key={q.id}>
                <div className="mb-2 flex items-start justify-between gap-2 text-sm text-slate-200">
                  <span>{i + 1}. {q.prompt}</span>
                  {submitted && (correct ? <CheckCircle2 size={16} className="shrink-0 text-emerald-400" /> : <XCircle size={16} className="shrink-0 text-rose-400" />)}
                </div>

                {q.type === 'mcq' ? (
                  <div className="space-y-1.5">
                    {q.options.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-xs text-slate-300">
                        <input
                          type="radio"
                          disabled={submitted}
                          name={q.id}
                          checked={answers[q.id] === opt}
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    className="input"
                    disabled={submitted}
                    value={answers[q.id] ?? ''}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                    placeholder="Type your answer..."
                  />
                )}

                {submitted && !correct && (
                  <p className="mt-1 text-xs text-slate-500">Correct answer: <span className="text-emerald-400">{q.answer}</span></p>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-5 flex items-center gap-3">
          {!submitted ? (
            <button className="btn-primary" onClick={handleSubmit}>Check Answers</button>
          ) : (
            <>
              <span className="pill bg-amber-500/10 font-mono text-amber-400">{score}/{script.questions.length} correct</span>
              <button className="btn-secondary" onClick={onDone}>Back to drills</button>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
