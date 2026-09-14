# CLAUDE.md — IELTS 2026

Repository context for Claude sessions working in this folder. Read this
before making changes.

## What this is

A local, single-user IELTS prep dashboard. React + Vite + Tailwind
frontend, no backend, no auth, no deployment — it runs on `localhost` via
`npm run dev` and reads score history from a single JSON file.

- **Target test date:** October 15, 2026
- **Target band:** 8.5 overall (Listening 9.0 / Reading 8.5 / Writing 8.0 / Speaking 8.0)
- Both **Academic** and **General Training** writing tracks are kept live
  (module not yet finalized) — see the toggle in the Writing tab.

## Repo layout

```
IELTS 2026/
├── README.md            ← human-facing overview, current scores, next steps
├── CLAUDE.md             ← you are here
├── data/
│   └── logs.json          ← single source of truth for all score/study data
├── Prep Resources/        ← raw study materials (Cambridge, IELTS Advantage, etc.)
│                             not yet text-mined — see "PDF resources" below
├── index.html, vite.config.js, tailwind.config.js, postcss.config.js
├── package.json
└── src/
    ├── main.jsx, App.jsx, index.css
    ├── lib/
    │   ├── LogsContext.jsx   ← React context wrapping data/logs.json + in-session overlay
    │   ├── gamification.js   ← XP / level / streak / countdown, all derived from data
    │   └── bands.js           ← IELTS band-score rounding & formatting helpers
    └── components/
        ├── layout/             ← Sidebar/nav
        ├── shared/             ← Card, BandPill, CopyJsonButton, ModuleToggle, PartToggle, Field
        ├── overview/           ← countdown, gamification header, radar chart, mock progression
        ├── writing/            ← Academic/General toggle, TR/CC/LR/GRA form, entry list
        ├── reading/            ← accuracy-by-question-type, error log
        ├── listening/          ← section tracker, map-labeling drill
        └── speaking/           ← Part 1/2/3 transcript logger, FC/LR/GRA/Pronunciation form
```

## Data model — `data/logs.json`

Top-level keys:

- `profile` — `targetTestDate`, `targetBandOverall`, `targetBands` (per skill).
- `studyLog[]` — daily micro-drills: `{ date, activity, module, minutes, xp }`.
  Drives the XP counter and the daily streak.
- `mockTests[]` — full practice tests: `{ id, date, label, overallBand, listening, reading, writing, speaking }`
  (per-skill fields are plain band numbers, not criteria breakdowns). Drives
  the radar chart and the progression line chart.
- `writingEntries[]` — per-task practice: `{ id, date, module: "academic"|"general", task: "task1"|"task2", prompt, tr, cc, lr, gra, notes }`.
- `readingEntries[]` — `{ id, date, questionType, correct, total, timeMinutes }`.
- `readingErrorLog[]` — `{ id, date, questionType, rootCause, notes }`.
- `listeningEntries[]` — `{ id, date, testName, sections: {s1,s2,s3,s4}, totalQuestions, band }`.
- `listeningMapDrills[]` — `{ id, date, mapName, correct, total, notes }`.
- `speakingEntries[]` — `{ id, date, part: "part1"|"part2"|"part3", transcript, fc, lr, gra, pron, notes }`.

When adding a new entry type or field, update this list.

## Persistence model — important

**There is no backend.** `data/logs.json` is imported statically by
`src/lib/LogsContext.jsx` (`import seedData from '../../data/logs.json'`).
This means:

1. The file on disk is the real source of truth.
2. In-app "Add to this session" buttons only update React state — they are
   an **overlay**, visible for that session, tagged with an "unsaved"
   badge. A reload without editing the file reverts to seed data.
3. Every log form also has a **"Copy JSON"** button that copies a
   ready-to-paste object (with a trailing comma) for the matching array in
   `data/logs.json`.

**To make a new entry durable:** paste the copied JSON into the right
array in `data/logs.json` and save — Vite's dev server hot-reloads JSON
imports automatically.

If a future session wants real persistence (form submits write the file
directly), that requires adding a small local backend (e.g. a tiny Express
or Vite plugin middleware that writes to `data/logs.json` on POST) — this
was deliberately deferred to keep the app a pure static frontend. Flag this
tradeoff to the user before silently adding a backend.

## Derived values (never hand-edit these — they're computed)

Defined in `src/lib/gamification.js`:

- **XP** = sum of `studyLog[].xp` + 100 × `mockTests.length`.
- **Level** = `floor(xp / 500) + 1` (500 XP per level).
- **Streak** = consecutive days in `studyLog` ending today or yesterday
  (breaks to 0 if the most recent entry is older than yesterday).
- **Days to test** = `targetTestDate − today`, computed client-side with the
  real current date (not hardcoded), so it's always accurate.

Band scores follow the official IELTS rule: average the 4 criteria, then
round to the nearest 0.5, rounding `.25` up to the next half-band and `.75`
up to the next whole band — implemented in `src/lib/bands.js::roundBand`.

## Conventions

- Dark mode is the only theme (`darkMode: 'class'` + `class="dark"` on
  `<html>` in `index.html`) — this is a personal single-user tool, not a
  themeable product.
- Component folders mirror the 5 dashboard sections; shared/reusable UI
  goes in `components/shared/`.
- Keep new "log an entry" forms consistent with the existing pattern: local
  form state → computed preview → `addEntry(collection, entry)` for the
  session overlay → `<CopyJsonButton>` for durable persistence.
- Prefer deriving stats (XP, streak, accuracy %, band averages) from
  `data/logs.json` at render time over storing redundant computed fields.

## PDF resources (`Prep Resources/`)

Contains Cambridge IELTS 21 Academic materials, IELTS Advantage
Reading/Writing skill books, a general prep guide, and a General Training
study plan. These have **not** been text-mined into this app yet —
`poppler-utils` (`pdftotext`/`pdftoppm`) isn't installed on this machine.
If asked to extract structured content from them (e.g. drill questions,
vocabulary lists), either install `poppler-utils` via Homebrew (ask first)
or read pages directly via the Read tool's PDF support.

## Known gaps / intentionally deferred

- The map-labeling drill (`listening/MapLabelingDrill.jsx`) uses a fixed
  sample floor plan (5 points, 6 options) — not generated from real audio
  content yet.
- No routing library — navigation is a `useState` tab switch in `App.jsx`,
  intentional given the small, single-page scope.
- No tests. Given the scope (personal tracking tool), verification has
  been via `npm run build` + manual dev-server smoke checks rather than an
  automated test suite — add one if the app grows in complexity.
