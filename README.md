# 🎃 Haunted Mansion AI

**Interactive horror stories · a mansion to explore · a trick-or-treat map**

Built for **Kiroween 2026** (Frankenstein track) — one app stitched from four
seemingly incompatible pieces: a deterministic interactive horror-story generator,
a haunted-mansion room explorer, a trick-or-treat neighbourhood map, and a spooky
Halloween UI.

**Live demo:** https://haunted-mansion-ai-2.netlify.app (no login needed).

## Run it (30 seconds, no accounts, no keys)

```bash
npm start
# open http://localhost:3000
```

Zero npm dependencies, no build step, no `npm install`. Requires Node.js ≥ 18.

## Test it

```bash
npm test
# 13 tests, Node built-in runner: determinism, endings, server, browser parity
```

## Features

- **📖 Story Generator** — pick a setting (Abandoned Mansion, Haunted Forest, Old
  Graveyard, Cursed Carnival), a monster (Weeping Ghost, Pumpkin King, Hollow
  Witch, Count Midnight) and a twist (Mirror Twin, Endless Night, Cursed Candy,
  The Invitation). You get a 5-chapter interactive story with 2 choices per
  chapter and one of 3 endings (Escape / Haunted / Tricked) based on your courage.
  Same choices + same seed = the same story, every time. "Surprise me" randomises.
- **🏚️ Mansion Explorer** — 6 rooms (Foyer, Library, Kitchen, Cellar, Attic,
  Ballroom), each with a description, a clue and a collectible item. Collect all 6
  to earn the Master of the Mansion badge. Inventory persists in localStorage.
- **🗺️ Trick-or-Treat Map** — 10 fictional houses around Salem, MA on a Leaflet /
  OpenStreetMap map, with candy ratings (1–5 pumpkins), scare levels, treats and
  hours. Filter by minimum candy rating, or order the "Best route" (top candy
  first). If map tiles cannot load (offline), the full house list still works.
- **🎃 Spooky UI** — dark theme, pumpkin-orange accents, tab navigation without
  page reloads, sound toggle state remembered in localStorage.

## Honest labelling

The "AI" here is a **deterministic seeded template generator** (FNV-1a hash +
mulberry32 PRNG) running entirely on your device — not a hosted LLM and not an
external API call. Stories are reproducible by design. All houses are fictional
demo data, so the map works anywhere.

## How it was built (Kiro)

Spec-driven, Kiro-style: `.kiro/specs/haunted-mansion-ai/` holds
`requirements.md` (EARS acceptance criteria), `design.md` and `tasks.md`;
`.kiro/steering/` holds product, tech and structure rules; `.kiro/hooks/`
holds a run-tests-on-save hook. See [KIRO-USAGE.md](KIRO-USAGE.md) for an honest
log of what Kiro actually did — including the fact that the Kiro CLI was installed
but never logged in on this machine (login needs the entrant's own account).

## Project structure

```
server.js                  Zero-dep static server + /healthz
public/                    index.html, css/style.css, js/{story-engine,data,app}.js
lib/story.js               Node re-export of the story engine (for tests)
test/                      story, server, browser-parity tests
.kiro/                     steering, specs, hooks (committed — required by Kiroween)
```

## License

MIT — see [LICENSE](LICENSE).
