# IELTS 2026

Status: **Active Prep**

## What this is

A personal IELTS preparation dashboard: a local React + Vite app that
tracks practice test scores, gamified daily study streaks/XP, and
module-wise progress across Listening, Reading, Writing (Academic &
General Training), and Speaking — all backed by a single local JSON file.

## Target scores

| | Overall | Listening | Reading | Writing | Speaking |
|---|---|---|---|---|---|
| **Target** | **8.5** | 9.0 | 8.5 | 8.0 | 8.0 |
| **Latest mock** (Progress Mock #3, 2026-09-10) | 7.5 | 8.0 | 7.5 | 7.0 | 7.5 |

**Target test date:** October 15, 2026 — see the live countdown on the
dashboard's Overview tab.

## Section logs

Score history lives in [`data/logs.json`](data/logs.json), seeded with 3
sample mock tests showing progression (6.5 → 7.0 → 7.5) plus sample entries
across writing, reading, listening, and speaking. See
[CLAUDE.md](CLAUDE.md) for the full data schema and how new entries get
added.

## Tech stack

- React 18 + Vite 5
- Tailwind CSS (dark mode)
- Recharts (radar chart, line/bar charts)
- lucide-react (icons)
- No backend — `data/logs.json` is read at build/dev time via a static
  import; see CLAUDE.md for the persistence model.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

Verified: `npm install`, `npm run build`, and `npm run dev` all complete
without errors as of the last setup pass.

## Dashboard sections

- **Overview** — countdown to test day, XP/level/streak header, target-vs-
  estimated band radar chart, mock test progression chart.
- **Writing** — Academic/General Training toggle, TR/CC/LR/GRA score
  entry form with live computed band, entry history per track.
- **Reading** — accuracy by question type (TFNG, Matching Headings,
  Summary Completion, etc.), root-cause error log.
- **Listening** — Section 1–4 score tracker, interactive map-labeling
  direction/spatial drill.
- **Speaking** — Part 1/2/3 transcript logger with FC/LR/GRA/Pronunciation
  scoring and computed band.

## Next steps

- [x] Scaffold repo structure (README, CLAUDE.md, src/, data/logs.json)
- [x] Build core dashboard UI across all 5 sections
- [x] Verify `npm install` / `npm run build` / `npm run dev` run clean
- [ ] Swap the map-labeling drill's sample floor plan for a real one from
      `Prep Resources/` audio materials
- [ ] Run an initial full diagnostic mock and log it as `mt-4`
- [ ] Mine `Prep Resources/` PDFs for a structured study plan (requires
      installing `poppler-utils` to extract text — ask Claude to do this)
- [ ] Decide Academic vs. General Training as the actual sitting (currently
      both tracks are kept live)

## Links

- Code repo: local only (this folder) — no remote yet
- Deployed URL: none — local dev only (`npm run dev`)
