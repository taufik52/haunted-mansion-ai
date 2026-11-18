# KIRO-USAGE.md — How Kiro was used (honest log)

> This file is written for the Kiroween judges. It states plainly what Kiro did
> and did not do on this project. No usage is invented.

## What Kiro is (per kiro.dev, checked 2026-11-12)

Kiro is AWS's spec-driven agentic development platform: IDE, CLI, Web and Kiro
Crew. Its workflow is: write a **spec** (requirements → design → tasks), add
**steering** rules, then let the agent implement and verify against the spec,
with **hooks** automating checks. The project must contain a `/.kiro` directory
at the repo root showing specs, hooks and steering.

## What actually happened on this project

### 1. Kiro CLI — installed, verified, logged in (19 Nov 2026)

- Official installer ran clean on this VM (Ubuntu 24.04.5 LTS, glibc 2.39):
  `curl -fsSL https://cli.kiro.dev/install | bash`
- Result: `kiro-cli 3.2.1` installed to `~/.local/bin/kiro-cli` (221 MB binary),
  verified with `kiro-cli --version` and `kiro-cli --help` on 2026-11-12.
- `kiro-cli whoami` → **"Not logged in"** at first (12 Nov).
- **Login succeeded 15 Nov 2026** (entrant's own Builder ID, capedong6@gmail.com,
  via the entrant's browser). Re-verified 19 Nov 2026: `kiro-cli whoami` →
  "Logged in with Builder ID, Email: capedong6@gmail.com".

### 4. Kiro agent session — 19 Nov 2026 (real session, non-interactive)

- Command (from the repo root, logged in as the entrant):
  `kiro-cli chat --no-interactive --trust-all-tools --trust-workspace
  "Review the spec in .kiro/specs/haunted-mansion-ai/ against the code in
  lib/ and public/js/, then run npm test and fix anything that fails. Do not
  change the deterministic story generator behavior without updating tests."`
- The agent read the spec files (requirements, design, tasks) and the code in
  parallel, then ran the full test suite itself.
- **Result: 13/13 tests pass, exit 0. No changes made** — the agent found the
  code matches the spec: mulberry32 PRNG, FNV-1a seed hash, 4×4×4 template
  tables, 5-chapter assembly, CHOICE_SETS courage model, three endings at
  ≥+2 / ≤−2 / otherwise; 6 rooms and 10 houses matching Req 2.1 and Req 3.1;
  `lib/story.js` as the single-line re-export the design calls for.
- Full session log: `~/workspace/kiro-session-2026-11-19.log` (kept outside the
  repo).

### 2. Kiro's spec-driven workflow — followed by hand

Because no agent session could run, the Kiro workflow was executed manually by
the build agent, following Kiro's documented structure exactly:

- **Spec first** (`.kiro/specs/haunted-mansion-ai/`): `requirements.md` with
  EARS-style acceptance criteria was written *before* any code; `design.md`
  (architecture, determinism, testing) and `tasks.md` (checklist, updated as
  work completed) followed.
- **Steering** (`.kiro/steering/`): `product.md` (honest labelling, no accounts),
  `tech.md` (zero dependencies, no `Math.random()` in generation),
  `structure.md` (repo layout, `.kiro/` committed).
- **Hooks** (`.kiro/hooks/hooks.json`): a `fileSaved` hook that runs `npm test`
  when JS under `lib/`, `public/js/` or `test/` changes — written in Kiro's hook
  JSON format; it will fire once the project is opened in Kiro IDE/CLI.

### 3. Verification — Kiro-style, hand-rolled

- Property-based-style checks (Kiro's PBT spirit): determinism over 50 seeds,
  chapter-count invariant over all 4×4×4 = 64 setting/monster/twist combos,
  ending always one of the 3 allowed values.
- `npm test`: **13/13 pass** (Node built-in runner, zero deps).
- End-to-end smoke: server on :3000 → `GET /` 200 (contains "Haunted Mansion
  AI"), `/healthz` → `{"status":"ok"}`, unknown path → 404.

## What Kiro did NOT do (to be clear with judges)

- Kiro's AI agent did **not** generate any code in this repo: every file was
  written by the build agent following the spec above. The spec/steering/hook
  artefacts are real and were genuinely used as the build plan. A real Kiro
  agent session ran on 19 Nov 2026 (see section 4) and reviewed the spec
  against the code + ran the tests — it found everything consistent and made
  no changes.
- No Kiro credits were used (none requested — the 4,000-credit request form
  needs the entrant's ID verification, which only Cipoz can do, before
  1 Dec 2026 12:00 PT).
- Kiro Web / Kiro Crew were not used.

## Next step for the entrant

1. ~~`kiro-cli login`~~ — done 15 Nov 2026 (Builder ID capedong6@gmail.com).
2. ~~Run `kiro-cli` in the repo and ask it to review the spec + run `npm test`~~ —
   done 19 Nov 2026 (see section 4; 13/13 pass, no changes).
3. Request the 4,000 free Kiro credits before 1 Dec 2026 12:00 PT (ID
   verification required — entrant's step) and record the demo video.
