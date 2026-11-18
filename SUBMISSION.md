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
64 setting/monster/twist combinations). The entrant logged in with his own
Builder ID (15 Nov 2026) and a real Kiro agent session ran in the repo on
19 Nov 2026: it reviewed the spec against the code and ran the full test
suite — 13/13 pass, no changes needed. No Kiro credits were used yet (the
4,000-credit request needs the entrant's ID verification).

## Links (fill in before submitting)

- Public GitHub repo: https://github.com/taufik52/haunted-mansion-ai (public, MIT license)
- Live app URL: **https://haunted-mansion-ai-2.netlify.app** (deployed 17 Nov 2026
  via Netlify, static hosting of `public/` — the app is fully client-side, so
  it runs as-is; `/healthz` exists only on the local `npm start` server, not on
  the static host)
- Demo video (< 3 min, public YouTube): https://youtu.be/h1WRXHD4A8o (2:30, published 19 Nov 2026, channel "cape dong", Public)

## How to run (for judges)

```bash
git clone https://github.com/taufik52/haunted-mansion-ai.git
cd haunted-mansion-ai
npm start        # http://localhost:3000
npm test         # 13 tests, all passing
```

## Built with

Kiro (specs, steering, hooks), Node.js (zero-dependency server + built-in test
runner), vanilla HTML/CSS/JS, Leaflet + OpenStreetMap (map tiles only).

## Checklist before submit

- [x] Public GitHub repo, MIT LICENSE visible in About, `/.kiro` NOT in .gitignore
      — https://github.com/taufik52/haunted-mansion-ai (verified public, MIT)
- [x] Live app URL works (judges can open it with no login) —
      https://haunted-mansion-ai-2.netlify.app (verified 17 Nov 2026: root 200,
      footer links repo; static host, no login wall. Old URL
      haunted-mansion-ai.netlify.app still serves the previous version from the
      ocilkecil12 account, which is out of deploy credits)
- [x] YouTube demo video < 3 min, public — https://youtu.be/h1WRXHD4A8o (2:30, published 19 Nov 2026)
- [ ] Kiro login done; agent session run inside the repo (update KIRO-USAGE.md)
- [ ] 4,000 free Kiro credits requested before 1 Dec 2026 12:00 PT (ID
      verification required — entrant's step)
- [ ] Devpost registration + submission completed before 4 Dec 2026 2:00 PM PT
