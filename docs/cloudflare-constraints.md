# Cloudflare Worker Constraints

Runtime and deploy-time constraints for this repo on Cloudflare Workers via `@opennextjs/cloudflare`. Read this before adding server-side fetches, cron handlers, or new bindings.

## Compatibility flags (`wrangler.toml`)

```
compatibility_flags = ["nodejs_compat", "global_fetch_strictly_public"]
```

### `nodejs_compat`

Enables the Workers Node compatibility layer (`node:*` imports, `process`, `Buffer`, etc.). Required by several OpenNext internals and by transitive dependencies (e.g. ethers, viem polyfills). Leave it on.

### `global_fetch_strictly_public`

Blocks the global `fetch()` from dispatching to other Workers in the same account. Only public internet destinations resolve. This closes a class of SSRF-style footguns where a Worker accidentally calls a sibling Worker (including itself) by hostname.

**What this means for us:**

- Public HTTPS fetches (Tari APIs, 3rd-party services) — work normally.
- Worker-to-Worker calls — MUST go through a service binding, not `fetch()`.
- Self-fetch (Worker calling its own public URL) — blocked; use the `WORKER_SELF_REFERENCE` service binding instead.

If a future feature needs to call another Tari Worker, add a `[[services]]` binding in `wrangler.toml` and use `env.BINDING.fetch(request)` — don't hardcode the sibling's URL into `fetch()`.

## `WORKER_SELF_REFERENCE` service binding

```
[[services]]
binding = "WORKER_SELF_REFERENCE"
service = "tari-dot-com-2025"
```

OpenNext uses this binding for ISR revalidation (`revalidateTag`, `revalidatePath`). It lets the Worker re-invoke itself without going through the public internet, which is necessary when `global_fetch_strictly_public` is on.

**Current status:** we do not use ISR. All content routes are statically generated via `generateStaticParams` (Phases 3–4). The binding is effectively unused today.

**Decision:** keep it in place. It is cheap (no cost for an idle service binding), and removing it would break ISR the moment someone adds `revalidateTag` later. Treat it as forward-compat insurance.

## Static assets

- `.open-next/assets` is served by the `ASSETS` binding (see `wrangler.toml`).
- Files under `public/` end up there automatically at build time.
- `public/_headers` is honoured by the assets handler for static responses.

## Build env plumbing

- `build.sh` is the Cloudflare build entrypoint. It sources one of `.env.dev`, `.env.staging`, `.env.prod` based on `$CF_PAGES_BRANCH`.
- That env var is a Cloudflare Pages artifact. On Workers Builds the equivalent is `$WORKERS_CI_BRANCH`. See `tasks/phase-10-buildsh-review.md` for the migration plan.

## Things that do NOT work on Workers

- Node-native binaries (sharp, native image transforms) outside the Node compat shim.
- Filesystem writes (`/tmp` is not persistent across invocations).
- Long-running sockets; each request has a CPU/wall-time budget.
- `middleware.ts` with Node APIs — use `src/proxy.ts` (Next 16) with Edge-safe code.

## References

- https://opennext.js.org/cloudflare — OpenNext Cloudflare adapter docs
- https://developers.cloudflare.com/workers/configuration/compatibility-flags/ — flag reference
- https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/ — service binding API
