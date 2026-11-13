# Tech Steering

## Stack

- Node.js ≥ 18 (built-in `node:test`, `node:http` only). **Zero npm dependencies.**
- Vanilla HTML/CSS/JS. No framework, no build step.
- Leaflet 1.9.4 via CDN for the map (optional; list fallback when offline).
- OpenStreetMap tiles (no API key).

## Rules

- No `npm install` step: `npm start` and `npm test` must work on a fresh checkout.
- Pure logic lives in `lib/` + `public/js/story-engine.js` and must be testable
  without a browser or network.
- Determinism is a feature: never use `Math.random()` in story generation;
  use the seeded PRNG only. (`Math.random()` is allowed only for the
  "Surprise me" button's seed pick, which is user-facing randomness, not story
  generation.)
- No secrets, no API keys, no network calls from the server (it only serves
  static files).
- All user-facing copy in English (submission language); code comments in English.
