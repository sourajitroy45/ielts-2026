# CLAUDE.md — IELTS 2026

Repository context for Claude sessions working in this folder. Read this
before making changes.

## What this is

A local, single-user IELTS **practice** app — not just a score tracker.
React + Vite + Tailwind frontend, no backend, no auth, no deployment — runs
on `localhost` via `npm run dev`. The main capability is gamified practice
content for each exam section, a generated day-by-day study plan, and a
spaced-repetition vocabulary trainer. Real mock-test scores are logged
separately, in a secondary **Progress** tab.

- **Target test date:** October 15, 2026
- **Target band:** 8.5 overall (Listening 9.0 / Reading 8.5 / Writing 8.0 / Speaking 8.0)
- Both **Academic** and **General Training** writing tracks are kept live.

This app was rebuilt once already (2026-09) from a pure score-tracking
dashboard into a practice-first tool, per explicit user feedback: "I don't
want to use it as a test tracking system but to practice using the portal."
Keep that framing in mind — practice/learning is the primary capability;
score logging is secondary.

## Repo layout

```
IELTS 2026/
├── README.md / CLAUDE.md
├── data/logs.json          ← real mock-test scores + evaluated practice (Progress tab only)
├── Prep Resources/          ← raw study materials, NOT text-mined (see below), git-ignored
└── src/
    ├── content/               ← static original practice content (not from Prep Resources)
    │   ├── vocabulary.js         10 sets × 10 words = 100 words
    │   ├── readingPassages.js    8 original passages + comprehension questions
    │   ├── listeningScripts.js   8 scripts (read aloud via TTS) + questions
    │   ├── writingPrompts.js     8 prompts (Academic T1/T2, General T1/T2); T1 includes chart data
    │   └── speakingCueCards.js   8 themed sets: Part 1 / Part 2 cue card / Part 3
    ├── lib/
    │   ├── LogsContext.jsx       data/logs.json + in-session overlay (Progress tab data)
    │   ├── progressStore.jsx     localStorage: practice completion, vocab Leitner state, plan checklist
    │   ├── NavigationContext.jsx lets any component switch the active sidebar tab
    │   ├── studyPlan.js          deterministic day-by-day plan generator (today → target date)
    │   ├── useCountdown.js       countdown-timer hook (writing/speaking timers)
    │   ├── gamification.js       XP / level / streak — merges logs.json + progressStore bonus XP
    │   └── bands.js              IELTS band-score rounding & formatting
    └── components/
        ├── layout/                Sidebar (8 nav items)
        ├── shared/                 Card, BandPill, CopyJsonButton, ModuleToggle, PartToggle, Field
        ├── overview/               countdown, gamification header, today's-plan card, quick links
        ├── studyplan/              StudyPlanModule — full day-by-day checklist
        ├── vocabulary/             VocabularyModule + VocabFlashcard — spaced-repetition review
        ├── writing/                practice: WritingModule → PromptRunner (timer + chart + self-score)
        ├── reading/                practice: ReadingModule → PassageRunner (TFNG/MCQ/completion)
        ├── listening/              practice: ListeningModule → ScriptRunner (TTSPlayer) + MapLabelingDrill
        ├── speaking/               practice: SpeakingModule → CueCardRunner (timers + MicRecorder)
        └── progress/               ProgressModule — mock-test radar/progression + per-skill score logs
                                     (contains *ScoreLog.jsx, moved here from the original build;
                                      they still render the shared *ScoreForm/*EntryList/*Tracker
                                      components that live in writing/, reading/, listening/, speaking/)
```

## Two separate data/progress systems — don't conflate them

1. **`data/logs.json`** (via `LogsContext`) — the record of *real, evaluated*
   results: mock tests and any score you choose to log (TR/CC/LR/GRA,
   section scores, etc.). Feeds the **Progress** tab only. Persistence
   model unchanged from the original build: static import, no backend: an
   in-app "Add to this session" is a session-only overlay; **"Copy JSON"**
   buttons copy a paste-ready entry for the matching array in the file —
   paste it in to persist, Vite hot-reloads the file automatically.

2. **`localStorage` via `progressStore.jsx`** (`useProgress()`) — durable,
   per-browser practice state: which content items you've completed
   (reading passages, listening drills, writing prompts, speaking sets),
   vocabulary Leitner-box state, and study-plan task checkboxes. This is
   what drives the **practice pages** and contributes bonus XP. It does
   **not** sync to `data/logs.json` and isn't meant to — it's UI/practice
   state, not a record worth hand-editing or committing.

When adding a feature, decide up front which of these two systems it
belongs to (or both, like `PromptRunner`, which marks practice complete in
`progressStore` *and* offers a Copy-JSON button to also log it as a real
score in `data/logs.json` if the user wants that).

## Study plan generator (`lib/studyPlan.js`)

`generateStudyPlan(targetDateStr, startDate = today)` deterministically
builds one entry per day from `startDate` to the target date. Same inputs
→ same task IDs every time, which is what lets task-completion state
(keyed by ID in `progressStore`) survive across reloads without a backend.

- A 7-day rotating cycle: `reading → listening → writing → speaking →
  mixed-rl → mixed-ws → review`.
- Every 10th day becomes a **mock-test** day (overrides the cycle).
- The last day before the target becomes **light-review** (logistics +
  light vocab only, no new content).
- The target date itself is **test-day** (a single congratulatory task).
- Each day's tasks reference specific items from `src/content/*` (rotated
  by index, wrapping via modulo) and always include one vocab-set review
  task. Task `link.page` lets a task jump straight to the relevant nav tab
  via `useNavigation()` — it does **not** deep-link to a specific content
  item (out of scope for this build); the user picks the item from that
  page's list.

## Gamification (`lib/gamification.js` + `progressStore.jsx`)

- **XP** = `sum(data.studyLog[].xp)` + `100 × mockTests.length` (from
  `logs.json`) **+** `bonusXp` (from `progressStore`: +15 per reading/
  listening item completed, +20 per writing/speaking item, +2 per vocab
  review, +10-50 per plan task depending on type — see `XP_VALUES` in
  `progressStore.jsx`).
- **Level** = `floor(xp / 500) + 1`.
- **Streak** = consecutive days with either a `studyLog` entry **or** any
  `progressStore` practice activity (content completion, vocab review, or
  plan task), ending today or yesterday.
- Band scores still follow the official IELTS rounding rule (`bands.js`).

## Practice mechanics, page by page

- **Reading/Listening** (`PassageRunner` / `ScriptRunner`): pick an item →
  answer inline (TFNG buttons / MCQ radios / short-answer text) → "Check
  Answers" grades with lenient string matching (`normalize()` in each
  runner — case/whitespace/currency-symbol insensitive, substring match)
  and reveals the correct answer next to anything wrong. Listening reads
  the script aloud via the **Web Speech API** (`TTSPlayer.jsx`,
  `window.speechSynthesis`) with play/pause/stop and a rate slider;
  degrades to a "show transcript" toggle if unsupported.
- **Writing** (`PromptRunner`): countdown timer (`useCountdown`), live word
  count, Academic Task 1 prompts render their chart via Recharts
  (`Task1Chart.jsx`, data lives on the prompt object in
  `writingPrompts.js`). Finishing opens a self-assessment (TR/CC/LR/GRA),
  computes the band, marks practice complete, and offers a Copy-JSON
  button to also log it in `data/logs.json`.
- **Speaking** (`CueCardRunner`): Part 1/2/3 tabs, Part 2 has separate prep
  and speak countdowns matching real test timing (60s prep / 2min speak).
  `MicRecorder.jsx` requests `getUserMedia` + `MediaRecorder`; the
  recording is a blob URL for in-browser playback only — **never uploaded
  or persisted**, gone on reload. Degrades gracefully (a message, no
  crash) if the mic is denied or `MediaRecorder` is unsupported.
- **Vocabulary**: simple 5-box Leitner system (`progressStore.jsx`,
  `LEITNER_INTERVALS`). Correct recall moves a word up a box (next review
  further out, up to 14 days at box 5 = "mastered"); incorrect resets to
  box 1 (due again tomorrow). "Review" tab shows only due words; "Browse
  Sets" shows every word's current box across all 10 themed sets.

## Content authoring rule — do not mine `Prep Resources/`

`Prep Resources/` contains what appear to be **pirated** copies of
copyrighted IELTS books (torrent-site marker files present — see
`.gitignore`, which excludes the whole folder from git). Do not extract
passages, prompts, or questions from those files into `src/content/` —
all practice content in this app must stay originally authored. If asked
to expand content, write new original material in the same style as the
existing `src/content/*.js` files.

## Persistence / verification notes

- `npm install`, `npm run build`, and `npm run dev` were all verified clean
  after this rebuild (Sept 2026) — see README for the exact commands.
- No automated tests. Verification has been build + dev-server smoke
  checks (every changed file requested via the dev server, confirming 200
  + no console errors) rather than a test suite.
- `gh auth setup-git` was run so plain `git push`/`git pull` work without
  extra `gh` invocations — see README's GitHub section.

## Known gaps / intentionally deferred

- No deep-linking from a study-plan task straight to a specific content
  item — it navigates to the page, user picks from the list.
- Reading/Listening answer grading is a lenient string match, not a
  real NLP grader — good enough for self-practice, not exam-accurate for
  free-text answers with many valid phrasings.
- No routing library — navigation is a `useState` tab switch lifted into
  `NavigationContext` so nested components (e.g. a study-plan task's "Go"
  button) can also trigger it.
- Writing/Speaking self-assessment is exactly that — self-assessed, no
  AI or tutor grading (would require a backend/LLM integration, out of
  scope for a static frontend).
