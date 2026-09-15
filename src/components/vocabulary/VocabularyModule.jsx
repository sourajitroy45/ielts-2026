import { useMemo, useState } from 'react'
import { BookMarked, Layers, PartyPopper } from 'lucide-react'
import { Card } from '../shared/Card.jsx'
import { VocabFlashcard } from './VocabFlashcard.jsx'
import { ALL_VOCAB_WORDS, VOCAB_SETS } from '../../content/vocabulary.js'
import { useProgress } from '../../lib/progressStore.jsx'

export function VocabularyModule() {
  const { blob, reviewVocab, vocabStats, todayStr } = useProgress()
  const [tab, setTab] = useState('review')
  const [cursor, setCursor] = useState(0)

  const dueWords = useMemo(() => {
    const today = todayStr()
    return ALL_VOCAB_WORDS.filter((w) => {
      const state = blob.vocab[w.id]
      if (!state) return true // never reviewed = new = due
      return state.nextReview <= today
    })
  }, [blob.vocab, todayStr])

  const currentWord = dueWords[cursor % Math.max(dueWords.length, 1)]

  function handleAnswer(knewIt) {
    reviewVocab(currentWord.id, knewIt)
    setCursor((c) => c + 1)
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-100">Vocabulary</h2>
        <p className="text-sm text-slate-500">
          Spaced-repetition flashcards across {VOCAB_SETS.length} themed sets ({ALL_VOCAB_WORDS.length} words). Words you know move
          further out on the review schedule; words you're still learning come back tomorrow.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <div className="text-2xl font-bold text-amber-400">{dueWords.length}</div>
          <div className="text-xs text-slate-500">due today</div>
        </Card>
        <Card className="!p-3 text-center">
          <div className="text-2xl font-bold text-slate-200">{vocabStats.inProgress}</div>
          <div className="text-xs text-slate-500">in progress</div>
        </Card>
        <Card className="!p-3 text-center">
          <div className="text-2xl font-bold text-emerald-400">{vocabStats.mastered}</div>
          <div className="text-xs text-slate-500">mastered</div>
        </Card>
      </div>

      <div className="inline-flex w-fit rounded-lg border border-base-700 bg-base-850 p-1">
        {[
          { key: 'review', label: 'Review', icon: BookMarked },
          { key: 'browse', label: 'Browse Sets', icon: Layers },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              tab === key ? 'bg-amber-500 text-base-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon size={13} /> {label}
          </button>
        ))}
      </div>

      {tab === 'review' && (
        <Card title={`Review (${cursor % Math.max(dueWords.length, 1) + (dueWords.length ? 1 : 0)}/${dueWords.length})`} icon={BookMarked}>
          {dueWords.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10 text-center text-slate-400">
              <PartyPopper size={28} className="text-amber-400" />
              <p>Nothing due right now — every word is scheduled for a later date. Nice work.</p>
            </div>
          ) : (
            <VocabFlashcard word={currentWord} onAnswer={handleAnswer} />
          )}
        </Card>
      )}

      {tab === 'browse' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {VOCAB_SETS.map((set) => {
            const known = set.words.filter((_, i) => (blob.vocab[`${set.id}-${i}`]?.box ?? 0) >= 5).length
            return (
              <Card key={set.id} title={set.title}>
                <div className="mb-3 text-xs text-slate-500">{known}/{set.words.length} mastered</div>
                <ul className="space-y-1.5">
                  {set.words.map((w, i) => {
                    const state = blob.vocab[`${set.id}-${i}`]
                    const box = state?.box ?? 0
                    return (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">{w.word}</span>
                        <span className={`pill ${box >= 5 ? 'bg-emerald-500/15 text-emerald-400' : box > 0 ? 'bg-amber-500/15 text-amber-400' : 'bg-base-800 text-slate-500'}`}>
                          {box >= 5 ? 'mastered' : box > 0 ? `box ${box}` : 'new'}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
