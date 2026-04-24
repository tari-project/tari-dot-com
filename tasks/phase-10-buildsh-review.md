# Phase 10 — Deployment Hygiene Review

Scope: `build.sh`, `wrangler.toml`, `package.json` script layout, and overall dev/build/preview/deploy path. Produced by Agent K.

## 1. `pages:build` rename

Done. Renamed to `worker:build` in `package.json`. Updated references in `README.md` and `CLAUDE.md`. The historical plan doc `docs/plans/2026-04-21-migrate-to-opennextjs-cloudflare.md` still mentions the old name but is intentionally left alone (it is a dated migration log, not living documentation).

No `.github/workflows` references to update — this repo has no CI on GitHub; Cloudflare runs `build.sh` directly.

## 2. `WORKER_SELF_REFERENCE` binding

Reviewed. Kept. Rationale and details in `docs/cloudflare-constraints.md`. Short version: it is unused today (no ISR), but removing it would silently break `revalidateTag`/`revalidatePath` the first time anyone adds dynamic revalidation. The binding has no cost when idle.

`wrangler.toml` had unstaged migration changes at review time — it was NOT edited in this phase.

## 3. `global_fetch_strictly_public`

Documented in `docs/cloudflare-constraints.md` and linked from `CLAUDE.md`. No code changes needed: the repo has no Worker-to-Worker fetches today.

Follow-up rule for future work: any new code that calls another Worker (including our own) must go through a service binding, not `fetch()` with a hardcoded URL.

## 4. `build.sh` and `CF_PAGES_BRANCH`

### Before

```bash
if [ "$CF_PAGES_BRANCH" == "prod" ]; then
  source .env.prod
elif [ "$CF_PAGES_BRANCH" == "staging" ]; then
...
else
  BRANCH_URL=${CF_PAGES_BRANCH//\//-}
  export NEXT_PUBLIC_BASE_URL="https://$BRANCH_URL.tari-dot-com-2025.pages.dev"
  source .env.dev
fi
```

Problems:

- `$CF_PAGES_BRANCH` is only set by Cloudflare **Pages** builds. On Cloudflare **Workers Builds** the equivalent variable is `$WORKERS_CI_BRANCH`. After the Pages → Workers migration, the old var is unset and the script always falls through to the `else` branch with an empty `BRANCH_URL`, producing a nonsense URL like `https://.tari-dot-com-2025.pages.dev`.
- The fallback URL still points at `*.pages.dev`. Post-migration preview URLs will live on `*.workers.dev` (or a custom domain). That fallback is stale.

### Applied fix

`build.sh` now resolves the branch from a chain of fallbacks, so it works unchanged on Pages, Workers Builds, and local shells:

```bash
BRANCH="${CF_PAGES_BRANCH:-${WORKERS_CI_BRANCH:-${GIT_BRANCH:-$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")}}}"
```

All downstream comparisons use `$BRANCH`. Behavior on Pages is unchanged (same `CF_PAGES_BRANCH` value flows through). On Workers Builds, `WORKERS_CI_BRANCH` now carries the branch. Locally, `git rev-parse` picks it up.

### Still open for human review

- The fallback `NEXT_PUBLIC_BASE_URL` in the `else` branch still points at `*.tari-dot-com-2025.pages.dev`. This is wrong post-migration but harmless for `prod`/`staging`/`dev` branches (they never hit it). The correct host depends on the Workers Builds setup, which is outside this phase's scope. Recommended follow-up: once the Workers deploy target is finalized, replace that line with the right `*.workers.dev` or preview-domain pattern.
- Consider whether `NEXT_PUBLIC_BASE_URL` should come out of `.env.<branch>` instead of being computed in `build.sh`. That would make the build environment-agnostic and keep all config in one place. Left for a future pass.

## 5. `dev` / `build` / `preview` / `deploy` coherence (read-only review)

Current scripts (after rename):

| Script | Command | Purpose |
|---|---|---|
| `dev` | `next dev` | Local Next dev server (Turbopack) |
| `build` | `next build` | Pure Next production build (no Worker wrap) |
| `start` | `next start` | Serve the Next build via Node |
| `worker:build` | `opennextjs-cloudflare build` | Wrap Next output for the Worker runtime |
| `preview` | `opennextjs-cloudflare build && opennextjs-cloudflare preview` | Build + local Worker preview (wrangler) |
| `deploy` | `opennextjs-cloudflare build && opennextjs-cloudflare deploy` | Build + ship to CF |

### Coherence findings

- **Good:** `preview` and `deploy` each re-run the build, so they never use stale output.
- **Good:** `worker:build` is now available as a cheap "just build the worker" step for CI and debugging without having to preview or deploy.
- **Gap:** `npm run build` is the **Next** build, not the Worker build. New contributors routinely expect `npm run build` to produce the deploy artifact. `README.md` and `CLAUDE.md` both document this, so the gap is cosmetic.
- **Gap:** none of these scripts run `npm run prebuild-all`, but the app imports files from `src/generated/` that only exist after prebuild. `build.sh` handles it for CF, but `npm run dev` and `npm run build` assume you already ran prebuild. This is documented in `CLAUDE.md` and is not a regression from this phase.
- **Gap:** no `clean` script. `.open-next/` and `.next/` can get stale between Next 16 and OpenNext reworks; a `rimraf .open-next .next .wrangler` script would help. Minor quality-of-life, out of scope here.

No blocking issues. The path `dev` → `build` → `worker:build` → `preview` → `deploy` is coherent.

## Summary of changes in this phase

- `package.json`: `pages:build` → `worker:build`
- `README.md`: updated command table
- `CLAUDE.md`: updated command doc + link to constraints doc
- `build.sh`: branch resolution now supports Pages, Workers Builds, and local shells
- `docs/cloudflare-constraints.md`: new, covers `nodejs_compat`, `global_fetch_strictly_public`, `WORKER_SELF_REFERENCE`, asset serving, build env plumbing
- `tasks/phase-10-buildsh-review.md`: this file

## Not touched (out of scope / unstaged)

- `wrangler.toml` — unstaged migration hunks from Agent D/E
- `next.config.mjs` — unstaged migration hunks
- `src/**` — out of scope
- `docs/plans/2026-04-21-migrate-to-opennextjs-cloudflare.md` — historical log, kept verbatim
