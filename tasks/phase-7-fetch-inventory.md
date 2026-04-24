# Phase 7 — Fetch Inventory

Every `fetch()` call in `src/` classified by execution side and target cache policy.

| # | File:Line | Side | Current cache | Target policy | Notes |
|---|-----------|------|---------------|---------------|-------|
| 1 | `src/services/api/useBlocks.ts:38` | Client (React Query, browser `fetch`) | default (browser HTTP cache) | `cache: 'no-store'`; RQ `refetchInterval: 30s`, `refetchIntervalInBackground: false` | Live chain head data. Must not be served stale from HTTP cache; React Query owns freshness. Pause polling when tab hidden. |
| 2 | `src/services/api/useMinerStats.ts:10` | Client (React Query) | default | `cache: 'no-store'`; RQ `refetchInterval: 5m`, `refetchIntervalInBackground: false` | Live miner count. Same reasoning as blocks. |
| 3 | `src/services/api/useDownloads.ts:20` | Client (React Query) | default | `cache: 'force-cache'`; RQ `staleTime: 60_000` | Build artifact catalog, slow-moving. Can ride the browser HTTP cache; short RQ staleTime avoids refetch chatter within a session. |
| 4 | `src/services/api/fetchExchangeData.ts:46` | **Server** (Server Component in `(exchange)/exchange/[name]/page.tsx`) | `cache: 'no-store'` (set by Agent G in Phase 6) | keep as-is | Out of scope for Phase 7 — owned by Phase 6. Verified `no-store` already present. |
| 5 | `src/services/api/useSubscribeNewsletter.ts:10` | Client (React Query mutation) | n/a (POST) | no change; explicitly no cache hint needed | Mutation: each call is a user-initiated submission. No stale-body risk because body is built fresh from args. |
| 6 | `src/services/api/useSendDownloadLink.ts:4` | Client (React Query mutation) | n/a (POST) | no change | Same rationale as #5. |
| 7 | `src/ui-shared/hooks/swap/lib/utils.ts:49` | Client (Swap widget, called from React Query hook) | default | out of scope | Lives under `src/ui-shared/hooks/swap/` which is swap-iframe territory; not touched in Phase 7 per scope restrictions. Future work: either add `cache: 'no-store'` or revalidate hourly to match the instrument name. |

## Rationale for client `cache` hints

The browser `fetch` `cache` option controls the HTTP cache, not React Query. We set it anyway because:

1. Live endpoints (`useBlocks`, `useMinerStats`) should never serve a 304-replayed stale body when React Query actually re-runs `queryFn`. `'no-store'` guarantees the request reaches the origin.
2. The downloads catalog benefits from the browser HTTP cache when the user revisits the page or another tab polls the same URL. `'force-cache'` lets the browser serve from cache first.
3. Mutations (`POST`) intentionally have no `cache` hint; a fresh body per call is the default.

## Background polling policy

`useBlocks` and `useMinerStats` both poll on intervals (30s and 5min). `refetchIntervalInBackground: false` stops them when the tab is hidden, saving Worker budget and user bandwidth. When the tab regains focus, React Query's `refetchOnReconnect: 'always'` default (set in `ReactQueryProvider`) handles the catch-up.

## Out-of-scope fetches (documented for completeness)

- `src/proxy.ts:17` — only a comment, not a call.
- `src/ui-shared/hooks/swap/lib/utils.ts:49` — swap-iframe hook, not part of Phase 7 scope.
- Any `fetch` inside `node_modules`, generators, or `scripts/` is ignored.

## Decisions

- React Query provider `networkMode`: switched from `'offlineFirst'` to `'always'`. This is a marketing + live-data site. `'offlineFirst'` was almost certainly an un-examined default; it causes queries to resolve from cache without firing a network request when the browser reports offline, which masks real upstream outages and is not desired here.
- Baseline `staleTime: 30_000`, `refetchOnWindowFocus: false`, `refetchOnReconnect: 'always'` set at the provider so individual hooks can override as needed.
- `useHlsScript` rewritten to `await import('hls.js')`. The cdnjs injection predated `hls.js` being a direct dep; the consumer components (`BlockVideo`, `VideoPlayer`) already import the package directly, so the hook itself had no live consumers but is kept as a working utility for future callers and returns the `Hls` class (not a boolean) so consumers can work with it without a `window.Hls` global.
