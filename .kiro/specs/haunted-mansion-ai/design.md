# Haunted Mansion AI — Spec: Design

## Overview

Zero-dependency Node.js static server + vanilla HTML/CSS/JS single-page app.
All story logic is pure, deterministic functions in `lib/` so it can be unit-tested
with Node's built-in runner and reused in the browser via a small ES-module shim
(`public/js/` imports the same logic through a browser copy generated from `lib/` —
in practice the browser loads `public/js/story.js`, which is the single source of
truth, and `lib/story.js` re-exports it for tests; see "Testing" below).

Single source of truth: **`public/js/story-engine.js`** holds the pure
deterministic logic (browser global `HauntedEngine`). `lib/story.js` is a
3-line CommonJS re-export (`module.exports =
require('../public/js/story-engine.js')`) so Node tests import the exact same
code the browser runs; `test/browser-parity.test.js` additionally loads the
browser file in a `vm` context and compares outputs. Data tables (settings,
monsters, twists live in the engine; rooms and houses in `public/js/data.js`,
global `HauntedData`); `public/js/app.js` is UI wiring only.

## Components

```
server.js                 Zero-dep HTTP server (Node http), serves public/, /healthz
public/index.html         Shell: header, 3 tabs (Story / Mansion / Map), footer
public/css/style.css      Dark Halloween theme (orange #ff7518, near-black bg)
public/js/story-engine.js Deterministic engine (seeded PRNG + templates) — browser
public/js/data.js         Rooms (6), houses (10), map centre (fictional)
public/js/app.js          UI wiring: tabs, story flow, mansion, map, filters
lib/story.js              Node re-export of the engine for tests (require)
test/story.test.js         Unit tests: determinism, chapter count, endings
test/server.test.js        Server tests: 200 on /, /healthz JSON, 404 handling
test/browser-parity.test.js Loads public/js/story-engine.js in vm, compares vectors
```

## Story engine design

- **Seeded PRNG**: mulberry32. Seed = hash of `setting|monster|twist|numericSeed`
  (FNV-1a 32-bit). Same input → same stream → same story.
- **Templates**: each setting has an opening, each monster has 2 behaviour lines,
  each twist has a reveal line; chapters 1–5 are assembled as:
  ch1 opening (setting), ch2 monster introduction, ch3 complication (twist hint),
  ch4 choice consequence, ch5 climax, then ending.
- **Choices**: each chapter offers 2 choices; each choice carries a `courage` delta
  (+1 brave, −1 cautious). Ending: total courage ≥ +2 → Escape; ≤ −2 → Tricked;
  otherwise Haunted. (Documented, testable, deterministic.)
- **Text variety**: each template slot has 3 variants, picked by PRNG stream, so
  different numeric seeds vary wording while structure stays 5 chapters.

## Map design

- Leaflet 1.9.4 via CDN (unpkg) + OpenStreetMap tiles. No API key.
- 10 fictional houses around Salem, MA (42.5195, −70.8967), with candy 1–5,
  scare 1–5, treats, hours.
- Offline fallback: if `L` (Leaflet) is undefined, hide the map div and show the
  list view (same data, same filters). Filter and "Best route" work on the data
  array, not on the map, so they work in both modes.

## Mansion design

- 6 rooms, static data. Inventory is a `Set` in memory + localStorage persist
  (`hmai-inventory`). Badge when all 6 looted.

## Testing

- `npm test` → `node --test` (Node ≥ 18 built-in runner, no deps; note: on Node 24,
  `node --test test/` fails — the trailing directory arg is treated as a module —
  so the script uses bare `node --test`, which discovers `test/*.test.js`).
- Property-style checks (Kiro PBT spirit, hand-rolled): determinism over 50 random
  seeds; chapter-count invariant over all setting×monster×twist combinations
  (4×4×4 = 64); ending is always one of the 3 allowed values.
- End-to-end smoke: start server on a test port, `curl /` → 200 and contains
  "Haunted Mansion AI", `curl /healthz` → `{"status":"ok"}`.

## Decisions

- No framework, no build step: judges run `npm start` and it works; no
  `node_modules` to install, no network needed except map tiles (optional).
- No LLM/API calls: the "AI" is a deterministic seeded generator — honest
  labelling in README (template + seeded RNG, not a hosted model).
- Frankenstein track: story generator + map + mansion + UI are four incompatible
  pieces stitched into one app — that is the track's premise.
