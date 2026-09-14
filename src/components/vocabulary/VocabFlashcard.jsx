import { useState } from 'react'
import { RotateCw, ThumbsDown, ThumbsUp } from 'lucide-react'

export function VocabFlashcard({ word, onAnswer }) {
  const [flipped, setFlipped] = useState(false)

  function handleAnswer(knewIt) {
    onAnswer(knewIt)
    setFlipped(false)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[180px] w-full max-w-md flex-col items-center justify-center gap-3 rounded-2xl border border-base-700 bg-base-850 p-6 text-center transition-colors hover:border-amber-500/40"
      >
        {!flipped ? (
          <>
            <span className="text-2xl font-bold text-slate-100">{word.word}</span>
            <span className="text-xs uppercase tracking-wide text-slate-500">{word.pos}</span>
            <span className="mt-2 flex items-center gap-1 text-xs text-slate-500">
              <RotateCw size={12} /> tap to reveal
            </span>
          </>
        ) : (
          <>
            <p className="text-sm text-slate-200">{word.definition}</p>
            <p className="text-xs italic text-slate-400">"{word.example}"</p>
            {word.synonyms?.length > 0 && (
              <p className="text-xs text-slate-500">Synonyms: {word.synonyms.join(', ')}</p>
            )}
          </>
        )}
      </button>

      {flipped && (
        <div className="flex gap-3">
          <button className="btn-secondary" onClick={() => handleAnswer(false)}>
            <ThumbsDown size={14} className="text-rose-400" /> Still learning
          </button>
          <button className="btn-primary" onClick={() => handleAnswer(true)}>
            <ThumbsUp size={14} /> I knew it
          </button>
        </div>
      )}
    </div>
  )
}
