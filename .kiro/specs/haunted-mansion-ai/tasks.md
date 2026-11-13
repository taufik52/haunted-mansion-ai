# Haunted Mansion AI — Spec: Tasks

- [x] 1. Write spec (requirements.md, design.md, tasks.md) before code
- [x] 2. Steering docs: product, tech, structure
- [x] 3. Implement deterministic story engine (`public/js/story-engine.js` + `lib/story.js`)
  - [x] 3.1 mulberry32 PRNG + FNV-1a seed hash
  - [x] 3.2 Template tables (4 settings × 4 monsters × 4 twists) + 5-chapter assembly
  - [x] 3.3 Choice/courage model + 3 endings (Escape / Haunted / Tricked)
- [x] 4. Implement data tables (`public/js/data.js`): rooms (6), houses (10)
- [x] 5. Implement UI (`public/index.html`, `public/css/style.css`, `public/js/app.js`)
  - [x] 5.1 Tab shell (Story / Mansion / Map), dark Halloween theme
  - [x] 5.2 Story view: pickers, generate, chapter + 2 choices, story log, ending, Surprise me
  - [x] 5.3 Mansion view: 6 rooms, collect item, inventory, badge
  - [x] 5.4 Map view: Leaflet + markers + popup, candy filter, Best route, offline list fallback
- [x] 6. Implement zero-dep server (`server.js` + `/healthz`)
- [x] 7. Tests (`test/`): determinism (50 seeds), 64-combination invariant, endings,
  server 200/healthz/404, browser parity via vm
- [x] 8. Run `npm test` + end-to-end smoke (curl /, /healthz); fix failures
  - Fixed: `node --test test/` fails on Node 24 (dir arg treated as module);
    script changed to bare `node --test`. Result: 13/13 pass.
- [x] 9. Docs: README.md, LICENSE (MIT), KIRO-USAGE.md, SUBMISSION.md, docs/DEMO-SCRIPT.md
- [x] 10. Verify Kiro CLI install status; record honestly in KIRO-USAGE.md
  - Installed: kiro-cli 3.2.1 at ~/.local/bin/kiro-cli (installer exit 0).
  - NOT logged in (`kiro-cli whoami` → "Not logged in") — login is Cipoz's step.
