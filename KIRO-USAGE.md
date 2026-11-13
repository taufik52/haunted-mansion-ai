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

### 1. Kiro CLI — installed, verified, NOT logged in

- Official installer ran clean on this VM (Ubuntu 24.04.5 LTS, glibc 2.39):
  `curl -fsSL https://cli.kiro.dev/install | bash`
- Result: `kiro-cli 3.2.1` installed to `~/.local/bin/kiro-cli` (221 MB binary),
  verified with `kiro-cli --version` and `kiro-cli --help` on 2026-11-12.
- `kiro-cli whoami` → **"Not logged in"**.
- **Login was deliberately NOT performed.** `kiro-cli login` requires signing in
  with the entrant's own GitHub, Google or AWS Builder ID account in a browser.
  The build instructions for this project forbade creating any AWS account and
  forbade using the entrant's credentials. Therefore **no Kiro agent session
  (chat/CLI/IDE) ever ran code on this project**. The CLI binary is installed
  and ready; the entrant (Cipoz) can run `kiro-cli login` and then `kiro-cli`
  inside the repo to continue development with the real agent.

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
  artefacts are real and were genuinely used as the build plan, but the
  "agent executed the spec" step is pending the entrant's login.
- No Kiro credits were used (none requested — the 4,000-credit request form
  needs the entrant's ID verification, which only Cipoz can do, before
  1 Dec 2026 12:00 PT).
- Kiro Web / Kiro Crew were not used.

## Next step for the entrant

1. `kiro-cli login` (GitHub/Google/AWS Builder ID — your own account).
2. `cd` into this repo, run `kiro-cli`, and ask it to review the spec in
   `.kiro/specs/haunted-mansion-ai/` against the code and run `npm test`.
3. That session's transcript + this file together document genuine Kiro usage
   for the submission write-up.
