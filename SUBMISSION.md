# SUBMISSION.md — Kiroween 2026 draft (English)

> Draft for the Devpost submission form. NOT submitted. Fill in the bracketed
> fields (GitHub URL, live-app URL, YouTube link) before submitting.
> Deadline: 4 Dec 2026, 2:00 PM PT (5 Dec 2026, 05:00 WIB).

## Project name

Haunted Mansion AI

## Category

**Frankenstein** — stitch together a chimera of technologies into one app.

## Tagline

Interactive horror stories, a mansion to explore, and a trick-or-treat map —
stitched into one spooky app.

## Description

Haunted Mansion AI is a Halloween web app that stitches four incompatible pieces
into one experience:

1. **Interactive horror-story generator** — pick a setting, a monster and a
   twist, and get a 5-chapter branching story with 2 choices per chapter and one
   of 3 endings (Escape / Haunted / Tricked) driven by the courage of your
   choices. Generation is deterministic: the same choices + seed always produce
   the same story.
2. **Haunted-mansion explorer** — 6 rooms (Foyer, Library, Kitchen, Cellar,
   Attic, Ballroom), each with a description, a clue and a collectible item.
   Collect all 6 to earn the Master of the Mansion badge.
3. **Trick-or-treat map** — 10 fictional houses on a Leaflet/OpenStreetMap map
   with candy ratings, scare levels, treats and hours. Filter by candy rating or
   order the "Best route". Works as a list when map tiles are offline.
4. **Spooky UI** — dark Halloween theme, tab navigation, remembered sound toggle.

No accounts, no API keys, no tracking. Runs with one command (`npm start`),
zero npm dependencies, no build step.

## How Kiro was used

See `KIRO-USAGE.md` in the repo (honest log). Summary: Kiro CLI 3.2.1 was
installed and verified on the build machine; the project was built following
Kiro's spec-driven workflow — EARS requirements, design and task checklist in
`.kiro/specs/haunted-mansion-ai/`, steering rules in `.kiro/steering/`, and a
run-tests-on-save hook in `.kiro/hooks/`. Verification followed Kiro's
property-based-testing spirit (determinism over 50 seeds, invariants over all
64 setting/monster/twist combinations). The Kiro agent session itself is pending
the entrant's login (`kiro-cli login` needs the entrant's own GitHub/Google/AWS
Builder ID account); no Kiro credits were used.

## Links (fill in before submitting)

- Public GitHub repo: [TODO — create public repo under the entrant's account,
  push this folder, MIT license detectable in About]
- Live app URL: **https://haunted-mansion-ai.netlify.app** (deployed 12 Nov 2026
  via Netlify, static hosting of `public/` — the app is fully client-side, so
  it runs as-is; `/healthz` exists only on the local `npm start` server, not on
  the static host)
- Demo video (< 3 min, public YouTube): [TODO — record per docs/DEMO-SCRIPT.md]

## How to run (for judges)

```bash
git clone <repo-url>
cd haunted-mansion-ai
npm start        # http://localhost:3000
npm test         # 13 tests, all passing
```

## Built with

Kiro (specs, steering, hooks), Node.js (zero-dependency server + built-in test
runner), vanilla HTML/CSS/JS, Leaflet + OpenStreetMap (map tiles only).

## Checklist before submit

- [ ] Public GitHub repo, MIT LICENSE visible in About, `/.kiro` NOT in .gitignore
- [x] Live app URL works (judges can open it with no login) —
      https://haunted-mansion-ai.netlify.app (verified 12 Nov 2026: root 200,
      JS/CSS 200; static host, no login wall)
- [ ] YouTube demo video < 3 min, public
- [ ] Kiro login done; agent session run inside the repo (update KIRO-USAGE.md)
- [ ] 4,000 free Kiro credits requested before 1 Dec 2026 12:00 PT (ID
      verification required — entrant's step)
- [ ] Devpost registration + submission completed before 4 Dec 2026 2:00 PM PT
