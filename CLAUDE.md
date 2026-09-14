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
- **Target band:** 9.0 across all four skills (raised from 8.5 overall per
  explicit request — "I want to aim for IELTS band 9").
- Both **Academic** and **General Training** writing tracks are kept live.

This app has been reworked twice already (2026-09), both times per
explicit user feedback:
1. From a pure score-tracking dashboard into a practice-first tool ("I
   don't want to use it as a test tracking system but to practice using
   the portal").
2. From Band-7-ish difficulty to genuine Band 9 calibration ("The
   sections seem too easy and doesn't follow latest IELTS testing and
   questions patterns").
Keep that framing in mind — practice/learning is the primary capability,
score logging is secondary, and content should stay calibrated to Band 9,
not a generic "intermediate" difficulty.

### Research note on "latest IELTS patterns" (2026-09)

Before the Band 9 rework, official sources were checked directly
(ielts.org, ielts.idp.com): the core test construct — skills assessed,
question-type families, section structure — is **unchanged for 2026**.
The only confirmed 2026 changes are delivery-mode ones: paper-based
testing ends mid-2026 (final date ~June 27, 2026 in most markets), a
"Writing on Paper" hybrid option exists in some markets, and IELTS One
Skill Retake (retake a single section within 60 days) is well-established.
Several SEO/blog sources claimed things like "new inference-focused
Listening question types" or "video-call Speaking" — **none of that is
corroborated by IELTS/IDP/Cambridge directly**, so none of it was built
into this app. If a future session is asked to chase another "2026
changes" claim, verify against ielts.org / ielts.idp.com first; don't
build features on uncorroborated blog claims.
What *did* legitimately warrant a rework: this app only exercised a
narrow slice of the official question-type taxonomy (TFNG, MCQ, one
completion type) at moderate difficulty. The real fix was widening
coverage to more of the official taxonomy and raising the register/
difficulty of the content itself — see `src/content/bandDescriptors.js`
for the actual official Band 9 vs Band 7 language this is calibrated
against (pulled directly from the ielts.org public band descriptor PDFs).

## Repo layout

```
IELTS 2026/
├── README.md / CLAUDE.md
├── data/logs.json          ← real mock-test scores + evaluated practice (Progress tab only)
├── Prep Resources/          ← raw study materials, NOT text-mined (see below), git-ignored
└── src/
    ├── content/               ← static original practice content (not from Prep Resources)
    │   ├── vocabulary.js         12 sets × ~10-12 words = 124 words (incl. 2 "Band 9" sets:
    │   │                         precise academic verbs + natural idiomatic collocations)
    │   ├── readingPassages.js    8 Band-9-register passages, lettered paragraphs (A, B, C...),
    │   │                         5 questions each spanning TFNG/YNNG/Matching Information/
    │   │                         Matching Sentence Endings/Summary Completion/MCQ
    │   ├── listeningScripts.js   8 scripts (read aloud via TTS), 6 questions each incl. 1
    │   │                         inference question requiring synthesis, not lookup
    │   ├── writingPrompts.js     17 prompts: 3 Academic Task 1 (line/bar/pie chart data),
    │   │                         5 Academic Task 2 + 4 General Task 2 (each labeled with its
    │   │                         official essay type — see bandDescriptors.js), 2 General Task 1
    │   ├── speakingCueCards.js   8 themed sets: Part 1 / Part 2 cue card / Part 3 (each now
    │   │                         includes one hypothetical/comparative question + a band9Tip)
    │   └── bandDescriptors.js    Official IELTS Band 9 vs Band 7 descriptor text (Writing +
    │                             Speaking, pulled from ielts.org PDFs) + the 5 official Task 2
    │                             essay types — the actual calibration reference for self-assessment
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
  answer inline → "Check Answers" grades via
  `lib/answerMatch.js::isAnswerCorrect` (shared by both runners) —
  case/whitespace/currency-symbol insensitive, but numeric answers require
  an **exact** match (a naive substring check previously marked "18"
  correct against answer "8" — fixed) and text answers require whole-word
  containment, not a raw substring. Reveals the correct answer next to
  anything wrong.
  Question `type` drives the input widget: `tfng` (True/False/Not Given),
  `ynng` (Yes/No/Not Given — for opinion-bearing passages), `mcq` (radio
  options — also used to implement Matching Information / Matching
  Sentence Endings / Classification / Inference questions, since they're
  all mechanically "pick one option"), `completion` (free text). The
  optional `label` field on a question is purely a UI badge naming the
  official task type — it does not affect grading — so adding a new
  "flavor" of matching/classification question never requires touching
  the runner, only the content file.
  Listening has an **Exam Mode vs Practice Mode** toggle (`ScriptRunner`,
  default Exam): Exam Mode plays the script once via the **Web Speech
  API** (`TTSPlayer.jsx`) at natural speed with no replay and no speed
  control — matches real test conditions; Practice Mode allows replay and
  an adjustable rate for building familiarity. In both modes the
  transcript is hidden until *after* submission (review only) — it used
  to be visible up front, which let you just read the answer instead of
  listening for it; that was the main reason the section felt too easy.
  Degrades to a "show transcript after submitting" message if
  `speechSynthesis` is unsupported.
  Listening scripts also each include at least one classic IELTS
  distractor (information stated, then explicitly corrected —
  "actually, that's changed" / "let me check again") and questions that
  paraphrase the text rather than quoting it, so keyword-spotting alone
  isn't enough.
- **Writing** (`PromptRunner`): countdown timer (`useCountdown`), live word
  count, Academic Task 1 prompts render their chart via Recharts
  (`Task1Chart.jsx` — supports line/bar/pie, data lives on the prompt
  object in `writingPrompts.js`). Task 2 prompts show their official essay
  type as a badge (`TASK2_ESSAY_TYPES` in `bandDescriptors.js`). Finishing
  opens a self-assessment (TR/CC/LR/GRA) with `BandDescriptorPanel` — the
  real official Band 9 vs Band 7 text, collapsed by default — right next
  to the score inputs, so self-assessment is calibrated against the actual
  descriptors rather than guesswork. Computes the band, marks practice
  complete, and offers a Copy-JSON button to also log it in
  `data/logs.json`.
- **Speaking** (`CueCardRunner`): Part 1/2/3 tabs, Part 2 has separate prep
  and speak countdowns matching real test timing (60s prep / 2min speak).
  Each set shows a `band9Tip` (short, specific guidance — not generic
  advice) and `SpeakingBandDescriptorPanel` (same Band 9 vs 7 pattern as
  Writing, sourced from the official Speaking descriptors). Part 3 always
  includes one hypothetical/comparative question — abstract reasoning
  under time pressure is the real Band 7→9 differentiator, more so than
  vocabulary alone. `MicRecorder.jsx` requests `getUserMedia` +
  `MediaRecorder`; the recording is a blob URL for in-browser playback
  only — **never uploaded or persisted**, gone on reload. Degrades
  gracefully (a message, no crash) if the mic is denied or
  `MediaRecorder` is unsupported.
- **Vocabulary**: simple 5-box Leitner system (`progressStore.jsx`,
  `LEITNER_INTERVALS`). Correct recall moves a word up a box (next review
  further out, up to 14 days at box 5 = "mastered"); incorrect resets to
  box 1 (due again tomorrow). "Review" tab shows only due words; "Browse
  Sets" shows every word's current box across all 10 themed sets.

## Content authoring rule — do not mine `Prep Resources/`

`Prep Resources/` contains what appear to be **pirated** copies of
copyrighted IELTS books and test audio (torrent-site marker files present
alongside a `Cambridge IELTS 21 Academic.rar` — see `.gitignore`, which
excludes the whole folder from git). Do not extract passages, prompts,
questions, or audio from those files into `src/content/` — all practice
content in this app must stay originally authored, text and audio alike
(Listening uses browser TTS specifically so no real audio file is ever
needed). This was asked for explicitly once already (to "fix" Listening
being too easy) and declined for this reason — the actual fix was
tightening the app's own content/grading, not sourcing real test audio.
If asked to expand content, write new original material in the same style
as the existing `src/content/*.js` files.

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
