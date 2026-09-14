# IELTS 2026

Status: **Active Prep**

## What this is

A local IELTS **practice** app — the main point is to actually *do* drills,
not just log scores. React + Vite dashboard with gamified practice content
for every exam section, a generated day-by-day study plan, and a
spaced-repetition vocabulary trainer. Real mock-test results still get
logged, but in a secondary Progress tab, not the main flow.

## Target scores

| | Overall | Listening | Reading | Writing | Speaking |
|---|---|---|---|---|---|
| **Target** | **8.5** | 9.0 | 8.5 | 8.0 | 8.0 |
| **Latest mock** (Progress Mock #3, 2026-09-10) | 7.5 | 8.0 | 7.5 | 7.0 | 7.5 |

**Target test date:** October 15, 2026 — live countdown on the Overview tab.

## Pages

- **Overview** — XP/level/streak header, today's study-plan tasks, quick
  links into every practice page, a compact band snapshot.
- **Study Plan** — a systematic day-by-day plan from today to test day:
  rotates through Reading/Listening/Writing/Speaking focus days, mixed
  drills, review days, and a mock test every 10 days, tapering to light
  review just before the exam. Checkable tasks award XP.
- **Vocabulary** — 100 words across 10 themed sets, flashcards with a
  5-box spaced-repetition (Leitner) system. Words you know move further
  out on the schedule; words you miss come back tomorrow.
- **Writing** — pick a prompt (Academic Task 1 includes a real chart,
  rendered live), write against a timer with live word count, then
  self-assess against TR/CC/LR/GRA for a computed band.
- **Reading** — 8 original passages with True/False/Not Given, multiple
  choice, and summary-completion questions, graded inline.
- **Listening** — 8 scripts read aloud in-browser via text-to-speech
  (covers all 4 section types) plus an interactive map-labeling drill for
  spatial/direction questions.
- **Speaking** — Part 1/2/3 practice sets with real exam timing (60s prep
  / 2min speak for Part 2) and optional mic recording for self-playback.
- **Progress** — the score-tracking half of the original build: mock-test
  radar/progression charts plus per-skill score logging forms, for when
  you actually sit a mock test or get evaluated feedback.

## Tech stack

- React 18 + Vite 5, Tailwind CSS (dark mode only)
- Recharts (radar/line/bar charts, Writing Task 1 visuals)
- lucide-react (icons)
- Web Speech API (Listening text-to-speech) and MediaRecorder API
  (Speaking mic recording) — both degrade gracefully if unsupported
- No backend. Two separate persistence layers — see CLAUDE.md:
  - `data/logs.json` — real mock-test scores (Progress tab), static import,
    edited by hand or via "Copy JSON" buttons
  - browser `localStorage` — practice completion, vocab spaced-repetition
    state, study-plan checkboxes (durable per-browser, not in the repo)

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

Verified: `npm install`, `npm run build`, and `npm run dev` all complete
without errors, and every module in the app was smoke-tested via the dev
server after the practice-first rebuild (Sept 2026).

## Next steps

- [x] Scaffold repo structure (README, CLAUDE.md, src/, data/logs.json)
- [x] Rebuild as a practice-first app: gamified drills per section, a
      generated day-by-day study plan, and a vocabulary page
- [x] Verify `npm install` / `npm run build` / `npm run dev` run clean
- [x] Push to GitHub (private repo, `Prep Resources/` excluded)
- [ ] Expand content pools (more reading passages, listening scripts,
      writing prompts, speaking sets) as the current ones get used up
- [ ] Consider real-time grading feedback for writing (would need an LLM
      backend — out of scope for a static frontend today)
- [ ] Decide Academic vs. General Training as the actual sitting (both
      tracks currently kept live)

## Links

- Code repo: [github.com/sourajitroy45/ielts-2026](https://github.com/sourajitroy45/ielts-2026) (private)
- Deployed URL: none — local dev only (`npm run dev`)
