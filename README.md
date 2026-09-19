# IELTS 2026

Status: **Active Prep**

## What this is

A local IELTS **practice** app — the main point is to actually *do* drills,
not just log scores. React + Vite dashboard, warm beige-and-deep-brown
theme, with gamified practice content for every exam section, embedded
"Faster Techniques" study material per skill, a generated day-by-day study
plan, and a spaced-repetition vocabulary trainer. Real mock-test results
still get logged, but in a secondary Progress tab, not the main flow.

## Target scores

| | Overall | Listening | Reading | Writing | Speaking |
|---|---|---|---|---|---|
| **Target** | **9.0** | 9.0 | 9.0 | 9.0 | 9.0 |
| **Latest mock** (Progress Mock #3, 2026-09-10) | 7.5 | 8.0 | 7.5 | 7.0 | 7.5 |

**Target test date:** October 15, 2026 — live countdown on the Overview tab.

Content and self-assessment are calibrated to Band 9 using the **official
IELTS Band Descriptors** (Writing + Speaking, pulled directly from
ielts.org) — see the "Band 9 vs. Band 7" reference panel in the Writing
and Speaking practice pages. Before this calibration pass, official
sources were checked directly to confirm the core 2026 test format is
unchanged (only delivery mode + retake logistics changed) — several
"2026 changes" claims circulating in blogs are not corroborated by
IELTS/IDP and were deliberately not built into this app; see CLAUDE.md
for the full research note.

Each of the 4 skill practice pages now also has an embedded **"Faster
Techniques"** panel (collapsed by default, one click to open) — concise,
actionable technique study material synthesized from converging advice
across established prep sources and community discussion (not fabricated
"latest pattern" claims — see the research note above and in CLAUDE.md).

## Pages

- **Overview** — XP/level/streak header, today's study-plan tasks, quick
  links into every practice page, a compact band snapshot.
- **Study Plan** — a systematic day-by-day plan from today to test day:
  rotates through Reading/Listening/Writing/Speaking focus days, mixed
  drills, review days, and a mock test every 10 days, tapering to light
  review just before the exam. Checkable tasks award XP.
- **Vocabulary** — 124 words across 12 themed sets (incl. 2 "Band 9" sets:
  precise academic verbs + natural idiomatic collocations), flashcards
  with a 5-box spaced-repetition (Leitner) system. Words you know move
  further out on the schedule; words you miss come back tomorrow.
- **Writing** — 17 prompts across both tracks, each Task 2 labeled with
  its official essay type (Opinion / Discussion / Problem-Solution /
  Advantage-Disadvantage / Two-Part). Academic Task 1 renders a real
  chart (line/bar/pie). Self-assessment shows the official Band 9 vs
  Band 7 descriptor text side by side while you score TR/CC/LR/GRA.
- **Reading** — 8 Band-9-register passages (lettered paragraphs, denser
  argument, less direct answer location) spanning True/False/Not Given,
  Yes/No/Not Given, Matching Information, Matching Sentence Endings,
  Summary Completion, and Multiple Choice — graded inline.
- **Listening** — 8 scripts read aloud via text-to-speech, each with a
  classic IELTS distractor (info stated, then corrected) and an inference
  question. **Exam Mode** (default) plays once at natural speed with the
  transcript hidden until after you submit; **Practice Mode** allows
  replay/slower speed. Plus an interactive map-labeling drill.
- **Speaking** — Part 1/2/3 practice sets with real exam timing (60s prep
  / 2min speak for Part 2), a Band 9 tip and descriptor reference per set,
  a hypothetical/comparative Part 3 question in every set, and optional
  mic recording for self-playback.
- **Progress** — the score-tracking half of the original build: mock-test
  radar/progression charts plus per-skill score logging forms, for when
  you actually sit a mock test or get evaluated feedback.

## Tech stack

- React 18 + Vite 5, Tailwind CSS — one committed **beige & deep brown**
  theme (no dark mode/toggle; see CLAUDE.md for the palette breakdown)
- Recharts (radar/line/bar charts, Writing Task 1 visuals)
- lucide-react (icons)
- Web Speech API (Listening text-to-speech) and MediaRecorder API
  (Speaking mic recording) — both degrade gracefully if unsupported
- No backend. Two separate persistence layers — see CLAUDE.md:
  - `data/logs.json` — real mock-test scores (Progress tab), static import,
    edited by hand or via "Copy JSON" buttons
  - browser `localStorage` — practice completion, vocab spaced-repetition
    state, study-plan checkboxes (durable per-browser, not in the repo)

## Live link

**https://sourajitroy45.github.io/ielts-2026/** — hosted on GitHub Pages,
works on any device (laptop, iPhone, etc.) with just the URL, no `npm`
needed. Auto-deploys within ~1-2 minutes of every push to `main` via
`.github/workflows/deploy.yml`.

Two things worth knowing about this setup:
- **The repo is public** (GitHub Pages requires this on the free plan —
  see CLAUDE.md for the tradeoff that was discussed and accepted). Don't
  put anything actually sensitive in `data/logs.json` or commit messages.
- **Progress does not sync across devices.** XP, vocab spaced-repetition
  state, and study-plan checkboxes live in browser `localStorage`, which
  is per-browser. Using the link on both a laptop and an iPhone gives you
  two independent practice histories, not a shared one — see CLAUDE.md if
  cross-device sync is ever wanted (it would need a real backend).
- **Add to Home Screen** on iPhone (Safari share sheet → "Add to Home
  Screen") for an app-like icon and standalone window — a web manifest +
  icons are set up for this.

## Running it locally

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
- [x] Rework Listening difficulty (transcript no longer visible pre-submit,
      Exam Mode, fixed a grading bug, harder scripts with distractors)
- [x] Recalibrate to Band 9: wider official question-type coverage in
      Reading/Listening, official Band 9 vs 7 descriptor reference in
      Writing/Speaking self-assessment, labeled Task 2 essay types,
      2 advanced vocabulary sets
- [x] Re-theme to beige & deep brown; add embedded "Faster Techniques"
      study material to all 4 skill practice pages
- [ ] Expand content pools (more reading passages, listening scripts,
      writing prompts, speaking sets) as the current ones get used up
- [ ] Consider real-time grading feedback for writing (would need an LLM
      backend — out of scope for a static frontend today)
- [ ] Decide Academic vs. General Training as the actual sitting (both
      tracks currently kept live)

## Links

- Code repo: [github.com/sourajitroy45/ielts-2026](https://github.com/sourajitroy45/ielts-2026) (public)
- Live app: [sourajitroy45.github.io/ielts-2026](https://sourajitroy45.github.io/ielts-2026/)
