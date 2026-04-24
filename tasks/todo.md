# Next.js 16 Cloudflare Worker Remediation Plan

## Objectives

- Restore basic engineering guardrails so local development and CI are trustworthy.
- Align the app with Next.js 16 App Router best practices instead of treating App Router as a thin wrapper over a client SPA.
- Reduce unnecessary Cloudflare Worker invocations by statically rendering content known at build time.
- Move data-fetching and caching decisions to the server where possible; reserve client-side fetching for genuinely interactive cases.
- Tighten deployment and runtime hygiene for OpenNext on Cloudflare Workers.

## Scope

- In scope: lint/CI repair, App Router architecture cleanup, static generation for content routes, exchange route SSR/data flow, fetch/cache hygiene, accessibility and metadata cleanup, docs updates, `_posts` dead-code removal, nested `<html>` fix, `build.sh` prebuild gap, app-level error boundaries, Zustand store consolidation, verification.
- Out of scope: visual redesign, copy changes, major feature work, changing upstream APIs, replacing styled-components, headless CMS migration, large asset migration to R2 / Stream (deferred to a future phase).

## Planned Work

### Phase 1: Guardrails — lint, CI, gitignore, build pipeline

- [ ] Replace `next lint` (deprecated in Next 15, removed in Next 16) with direct ESLint CLI in `package.json` scripts.
- [ ] Simplify `eslint.config.mjs` to the current `eslint-config-next` flat-config pattern.
- [ ] Align `npm run lint`, `npm run lint:fix`, and CI on one path.
- [ ] Tighten CI in `.github/workflows/pr-checks.yml`: drop `--max-warnings=999`, remove `|| echo …` fallback on `format:check`, add an `opennextjs-cloudflare build` sanity step.
- [ ] Fix `build.sh` to run `npm run prebuild-all` before `npx opennextjs-cloudflare build`.
- [ ] Add `.gitignore` entries for `.vercel/` and `tsconfig.tsbuildinfo`; stop hand-editing `next-env.d.ts`.
- [ ] Remove dead `_posts` pipeline: `_posts/`, `scripts/generate-posts-data.js`, `prebuild-posts` script, generated `posts-*.json`. Verify with ripgrep that nothing imports them.
- [ ] Verification: `npm run lint`, `npx tsc --noEmit`, CI config sanity, `npm run prebuild-all && npx opennextjs-cloudflare build` green locally.

### Phase 2: Correctness fixes — nested HTML, error boundaries, viewport

- [ ] Investigate nested `<html>`: curl production for `/`, `/exchange/<id>`, `/swaps`. Confirm actual rendered DOM before editing.
- [ ] Repair nested `<html>`: either make `src/app/layout.tsx` a pass-through OR strip `<html>/<body>` from `LayoutExchange.tsx` and `(iframe)/swaps/layout.tsx`, whichever matches production intent.
- [ ] Add `error.tsx`, `not-found.tsx`, `loading.tsx` at `src/app/` and per group where useful (`(main)`, `(exchange)`, `(iframe)`).
- [ ] Remove `maximumScale: 1` from `src/app/layout.tsx` viewport; allow pinch zoom (a11y).
- [ ] Verification: curl before/after; smoke-test home, exchange, swap iframe; view-source spot-check.

### Phase 3: Make static content routes actually static

- [ ] Convert `/updates`, `/updates/[slug]`, `/lessons`, `/lessons/[slug]` to build-time static rendering.
- [ ] Add `generateStaticParams` for slug routes backed by generated JSON.
- [ ] Confirm pagination is client-side (expected); if so, no server-side `searchParams` needed. Otherwise, pick static segment pagination or accept fully dynamic as an explicit tradeoff.
- [ ] Adopt `'use cache'` + `cacheTag('lessons' | 'updates')` + `cacheLife` in `src/services/lib/lessons.ts` and `updates.ts`.
- [ ] Verification: `npm run build`, confirm content routes flip from `ƒ` to `○` in build output.

### Phase 4: Remove mutation in content services

- [ ] Make `getAllLessons`, `getSortedLessons`, and peers return copies before sorting or filtering.
- [ ] Audit all content helpers for in-place mutation of imported JSON/module state.
- [ ] Keep helper semantics explicit: raw accessors return raw data; sorted/filtered accessors return new arrays.
- [ ] Verification: typecheck; targeted code review of all content helper call sites.

### Phase 5a: Client/server boundary audit (read-only)

- [ ] Inventory every `'use client'` in `src/app/` and `src/sites/`.
- [ ] Build a table: component, reason for `'use client'` (state / effects / browser API / third-party client-only), can it become a server component?, which deps force it.
- [ ] Capture baseline client bundle per route from `npm run build` output.
- [ ] Deliverable: `tasks/phase-5-audit.md` with a prioritized list of components to migrate.

### Phase 5b: Client/server boundary execution

- [ ] Execute the audit's recommendations in one or more PRs.
- [ ] Shrink provider scope: distinguish global providers from route-specific ones.
- [ ] Replace styled-components / zustand usage with server-compatible alternatives where trivial.
- [ ] Verification: `npm run build`; compare bundle sizes vs Phase 5a baseline; smoke-test hydration-sensitive pages.

### Phase 6: Exchange route SSR

- [ ] Fetch exchange data on the server in `src/app/(exchange)/exchange/[name]/page.tsx`.
- [ ] Pass server-fetched data into the page/component tree via props; seed React Query with `initialData` for post-hydration refresh.
- [ ] Pick explicit cache semantics: `'use cache'` with a short `cacheLife` + `cacheTag('exchange:' + id)`, or `fetch(url, { cache: 'no-store' })` if every request must be fresh.
- [ ] Keep password in URL per product requirement (shareable links); add `encodeURIComponent` on construction; document the rationale in code.
- [ ] Verification: `npm run build`; manual request test with and without password (including special chars); Network panel check for no duplicate upstream fetch on first render.

### Phase 7: Fetch and cache hygiene

- [ ] Produce an inventory table of every `fetch` call: path, caller (server/client), current cache policy, target cache policy.
- [ ] Set explicit `cache`, `next.revalidate`, or `no-store` on every server fetch.
- [ ] Review `refetchInterval` in `useBlocks` (30s) and `useMinerStats` (5min); pause on hidden tabs or remove if not product-required.
- [ ] Revisit React Query `offlineFirst` default in `ReactQueryProvider.tsx`.
- [ ] Replace `useHlsScript` runtime cdnjs injection with `await import('hls.js')` (dep is already in `package.json`).
- [ ] Verification: inventory reviewed; smoke-test downloads / miner / exchange; Network tab audit.

### Phase 8: Runtime, a11y, metadata, env config

- [ ] Move root-layout video preloads to the home page only (they don't benefit other routes).
- [ ] Migrate ad-hoc `<head>` usage to `metadata` / `viewport` exports where feasible.
- [ ] Audit third-party scripts: GTM, GA (two IDs), Turnstile — confirm each is intentional and deduplicated.
- [ ] Move hardcoded IDs to env vars: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`, `NEXT_PUBLIC_RWA_API`, `NEXT_PUBLIC_CF_STREAM_CUSTOMER`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA_ID_*`. Remove hardcoded fallbacks.
- [ ] Run `npm run cf-typegen`; commit `cloudflare-env.d.ts`.
- [ ] Verification: view-source review; a11y spot-check (pinch zoom, alt text, aria roles).

### Phase 9: Zustand consolidation + proxy matcher

- [ ] Consolidate `src/services/stores/*` into `src/stores/`. Standardize on one creation pattern; drop custom `create` wrapper unless `resetAllStores` is actually called somewhere.
- [ ] Narrow `src/proxy.ts` matcher from `['/(.*)']` to `['/launchpad/:path*', '/ootle/community-templates/:path*']`.
- [ ] Verification: ripgrep confirms no dangling imports; smoke-test `/launchpad` redirect and `/ootle/community-templates/*` rewrite.

### Phase 10: Deployment hygiene

- [ ] Rename `pages:build` script to `worker:build` (Pages-era naming is misleading).
- [ ] Decide the fate of `WORKER_SELF_REFERENCE` binding in `wrangler.toml` — is it needed by OpenNext or dead config?
- [ ] Document implications of `global_fetch_strictly_public` compat flag.
- [ ] Review `build.sh` `CF_PAGES_BRANCH` logic against the current Workers deployment model.
- [ ] Verification: `npm run build`, OpenNext preview with `npm run preview`, Wrangler config review.

### Phase 11: Documentation

- [ ] Rewrite `README.md` with project-specific setup, lint, build, preview, deploy.
- [ ] Refresh `CLAUDE.md` — currently references Next 15, `@cloudflare/next-on-pages`, Cloudflare Pages.
- [ ] Align `AGENTS.md` where necessary.
- [ ] Document Next.js 16 expectations: server/client boundaries, static generation, Cloudflare Worker constraints.
- [ ] Document env layout: `.env.*`, `.dev.vars`, `wrangler secret`.
- [ ] Verification: fresh read-through from a contributor's perspective.

## Recommended Execution Order

1. Phase 1 (guardrails) — always first.
2. Phase 2 (correctness) — small, obvious, unlocks confidence.
3. Phases 3 + 4 (static content + mutation audit) — combined PR; same files.
4. Phase 6 (exchange SSR) — clearest dynamic-route win.
5. Phase 7 (fetch hygiene) — builds on Phase 3 and 6.
6. Phase 5a (client/server audit) — produces plan doc.
7. Phase 5b (client/server execute) — one or more PRs.
8. Phases 8 + 9 (runtime/a11y/env + stores/proxy) — bundled.
9. Phases 10 + 11 (deployment + docs) — last.

## Execution Strategy

- Wave-based parallel agent dispatch:
  - Wave 1: Phases 1, 2, 9, 11, 5a in parallel (non-overlapping file scopes).
  - Wave 2: Phases 3 + 4 (serial; same files).
  - Wave 3: Phases 6 + 7 in parallel.
  - Wave 4: Phases 5b + 8 + 10 in parallel.
- Each agent commits its own phase with a descriptive message.
- Review checkpoint after each wave.
- Every agent runs `npx tsc --noEmit` and `npm run lint` before committing.

## Success Criteria

- `npm run lint` works locally and in CI (no `--max-warnings=999`).
- `npx tsc --noEmit` passes.
- `npm run prebuild-all && npx opennextjs-cloudflare build` succeeds in CI.
- No nested `<html>` tags in rendered output.
- Build output shows target content routes as static (`○`).
- Exchange route renders useful first paint from server data; no duplicate initial fetch.
- All `fetch` call sites have explicit cache policies.
- Client bundle size per route measured before/after Phase 5.
- Client-only code limited to genuinely interactive islands.
- `README.md`, `CLAUDE.md`, `AGENTS.md` reflect Next 16 + OpenNext + Workers reality.

## Risks / Watchouts

- Uncommitted work on the `worker` branch overlaps file scope; agents must diff carefully against the working tree, not just `HEAD`.
- Pagination driven by query strings may keep some index pages dynamic unless route structure changes.
- Styled-components and global style decisions may currently force broader client boundaries than ideal.
- The exchange/password flow depends on external product behavior; test carefully.
- Analytics and preload changes can affect marketing instrumentation and perceived performance if changed without measurement.
- Password-in-URL remains by product requirement (shareable links); logs may contain passwords — document mitigation.
- Removing `maximumScale: 1` changes mobile behavior on pages with custom gesture handling — test Swap iframe specifically.
- `global_fetch_strictly_public` blocks internal fetches; any future internal proxy must use service bindings, not `fetch()`.

## Review

- Plan authored from the current repository state, verified against local `build`, lint failure behavior, and Cloudflare/OpenNext config.
- Implementation completed in four waves of parallel subagents on branch `worker` on 2026-04-24.

## Execution Results (2026-04-24)

### Commits landed on `worker`

| Phase | Commit | Summary |
|---|---|---|
| 1 | `2b94b62` | Restored lint/CI guardrails; replaced `next lint` with direct ESLint CLI; simplified flat-config; tightened PR checks; fixed `build.sh` to run `prebuild-all`; removed dead `_posts` pipeline |
| 2 | `83d3a32` | Curl'd prod and confirmed nested `<html>` on `/exchange/*`; stripped `<html>`/`<body>` from group layouts; added `error.tsx`, `not-found.tsx`, `(main)/loading.tsx`; removed `maximumScale: 1` viewport restriction |
| 3+4 | `e4768eb` | Fixed in-place mutation in content helpers (confirmed `lessons/page.tsx` was mutating the raw JSON); added `generateStaticParams` to `/lessons/[slug]` and `/updates/[slug]` (143 + 11 prerendered pages); `'use cache'` deferred pending `cacheComponents: true` in next.config.mjs |
| 5a | `9ca24b8` | Audit doc at `tasks/phase-5-audit.md` — 135 `'use client'` files, top wins identified |
| 5b | `aeb921f` | Converted 3 legal pages + Footer from client to server (−4 `'use client'` files). LessonPage/PostPage conversion blocked by `as={Link}` styled-component pattern — flagged for follow-up |
| 6 | `9da956f` | Exchange route: `React.cache()` to dedupe fetches, `initialData` seeded into React Query, `encodeURIComponent(password)` for URL safety, `cache: 'no-store'` for live data |
| 7 | `7fb1807` | Fetch inventory at `tasks/phase-7-fetch-inventory.md`; explicit cache policy on every service hook; React Query defaults updated (`networkMode: 'always'`, `staleTime: 30s`, no focus-refetch); `useHlsScript` uses bundled `hls.js` via dynamic import |
| 8 | `1939965` | Video preloads moved from root layout to home page (`ReactDOM.preload()`); `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` + `NEXT_PUBLIC_RWA_API` env vars; `.env.example` added; `cloudflare-env.d.ts` committed from `cf-typegen`; root layout metadata API |
| 9 | `526bf32` | Merged `src/services/stores/*` into `src/stores/`; dropped unused `resetAllStores` wrapper; standardized on raw zustand; narrowed `src/proxy.ts` matcher from catch-all |
| 10 | `00d21ba` | Renamed `pages:build` → `worker:build`; `build.sh` branch resolution is now Pages/Workers/local-agnostic; `docs/cloudflare-constraints.md` documents `nodejs_compat`, `global_fetch_strictly_public`, `WORKER_SELF_REFERENCE`; buildsh review doc |
| 11 | `dbc8de3` | Rewrote `README.md` (was boilerplate); refreshed `CLAUDE.md` (was stale Next 15 + `next-on-pages` + Pages references); added Next 16 expectations section |

### Verification

- `npx tsc --noEmit` — 4 pre-existing errors in `VeraMobileDownload.tsx`, `DownloadModal.tsx`, `swap/lib/utils.ts` (`'r'`/`'data' is of type 'unknown'`). All predate this session.
- `npm run build` — succeeds. 169 static pages generated including all lesson and update slugs.
- `_posts/`, `scripts/generate-posts-data.js`, `src/generated/all-posts.json`, `src/generated/posts-map.json` removed.
- `'use client'` count: 136 → 132.
- Nested `<html>` on `/exchange/*` verified fixed in source.

### Follow-ups flagged by agents

1. **`'use cache'` adoption** (Phase 3+4 blocker): needs `cacheComponents: true` in `next.config.mjs`. Deferred because `next.config.mjs` had in-flight migration changes unstaged.
2. **LessonPage / PostPage server conversion** (Phase 5b): blocked by `as={Link}` pattern in children's `styles.ts`. Fix: rewrite as `styled(Link)`. Small PR.
3. **GTM/GA env-var migration** in `src/ui-shared/layouts/Layout/Layout.tsx` (Phase 8): deferred because the file had unstaged migration changes. Variables are already documented in `.env.example`.
4. **`NEXT_PUBLIC_CF_STREAM_CUSTOMER`** (Phase 8): 8 components still embed `customer-o6ocjyfui1ltpm5h` literally. Documented for follow-up.
5. **`build.sh` stale `.pages.dev` fallback URL** (Phase 10): flagged in `tasks/phase-10-buildsh-review.md` pending human decision on final deploy target.
6. **Pre-existing TS errors** (4 files): `'unknown'` type narrowing needed — not scoped into this remediation.
7. **In-flight Next 15 → 16 migration changes** in the working tree: ~30 files still unstaged. These predate this session and should be reviewed + committed separately.

### Process notes

- Wave-based execution: Wave 1 (5 parallel) → Wave 2 (1 serial) → Wave 3 (2 parallel) → Wave 4 (3 parallel). 11 commits, no pushes, no amends.
- One race condition in Wave 1: parallel agents sharing one git index caused Phase 2's first commit to be swept into Phase 11's staging then reset away. Phase 2's working-tree changes survived and were re-committed cleanly as `83d3a32`. **Lesson**: parallel agents need separate worktrees (or serial execution within a shared tree) to avoid index contention.
- Every agent verified `tsc --noEmit` before committing. Every agent staged files explicitly with `git add <path>` per the orchestrator's instructions.

