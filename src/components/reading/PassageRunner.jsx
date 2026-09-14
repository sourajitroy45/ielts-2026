import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { useProgress } from '../../lib/progressStore.jsx'
import { isAnswerCorrect } from '../../lib/answerMatch.js'

const YNNG_OPTIONS = ['YES', 'NO', 'NOT GIVEN']
const TFNG_OPTIONS = ['TRUE', 'FALSE', 'NOT GIVEN']

export function PassageRunner({ passage, onDone }) {
  const { markContentDone } = useProgress()
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const score = passage.questions.filter((q) => isAnswerCorrect(q, answers[q.id])).length

  function handleSubmit() {
    setSubmitted(true)
    markContentDone('reading', passage.id, { correct: score, total: passage.questions.length })
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card title={passage.title}>
        <p className="mb-3 text-xs text-slate-500">
          {passage.questions.length} questions · suggested time {Math.round(passage.text.split(' ').length / 20)} min
          (real exam pace: ~1.5 min/question)
        </p>
        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">{passage.text}</p>
      </Card>

      <Card title="Questions">
        <div className="space-y-5">
          {passage.questions.map((q, i) => {
            const correct = submitted && isAnswerCorrect(q, answers[q.id])
            const options = q.type === 'ynng' ? YNNG_OPTIONS : q.type === 'tfng' ? TFNG_OPTIONS : null
            return (
              <div key={q.id}>
                <div className="mb-1.5 flex items-start justify-between gap-2">
                  {q.label && <span className="pill bg-sky-500/10 text-sky-400">{q.label}</span>}
                </div>
                <div className="mb-2 flex items-start justify-between gap-2 text-sm text-slate-200">
                  <span>{i + 1}. {q.prompt}</span>
                  {submitted && (correct ? <CheckCircle2 size={16} className="shrink-0 text-emerald-400" /> : <XCircle size={16} className="shrink-0 text-rose-400" />)}
                </div>

                {options && (
                  <div className="flex flex-wrap gap-2">
                    {options.map((opt) => (
                      <button
                        key={opt}
                        disabled={submitted}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                        className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
                          answers[q.id] === opt ? 'border-amber-500 bg-amber-500/15 text-amber-400' : 'border-base-700 bg-base-850 text-slate-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === 'mcq' && (
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
                )}

                {q.type === 'completion' && (
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
              <span className="pill bg-amber-500/10 font-mono text-amber-400">{score}/{passage.questions.length} correct</span>
              <button className="btn-secondary" onClick={onDone}>Back to passages</button>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
