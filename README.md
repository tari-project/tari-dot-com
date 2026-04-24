# tari-dot-com

Marketing site for Tari plus the embedded web3 swap iframe. Serves `tari.com`, exchange pages, and the `(iframe)/swaps` widget from a single Next.js app deployed to Cloudflare Workers.

## Tech Stack

- **Next.js 16** (App Router, Turbopack as default bundler), **React 19**
- **@opennextjs/cloudflare 1.19+** — build target is Cloudflare Workers (not Pages, not `next-on-pages`)
- **styled-components** for styling, **motion** (Framer Motion) for animation
- **zustand** for global client state, **@tanstack/react-query** for remote data
- **wagmi / viem / @reown/appkit** for the swap iframe web3 flow
- TypeScript throughout

## Prerequisites

- Node.js **24** (see `.nvmrc`)
- npm

## Setup

```bash
nvm use            # or install Node 24
npm install
npm run prebuild-all   # compiles _lessons / _updates / _posts markdown into src/generated/*.json
npm run dev            # http://localhost:3000
```

`prebuild-all` must run before the first `dev` or `build`. The app imports `src/generated/*.json`; those files are produced from markdown and are not committed.

## Common Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Next dev server (Turbopack) |
| `npm run build` | Next production build |
| `npm run start` | Serve the Next build locally |
| `npm run prebuild-all` | Regenerate `src/generated/*.json` from markdown |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run format` / `format:check` | Prettier |
| `npm run worker:build` | OpenNext Cloudflare Worker build |
| `npm run preview` | OpenNext build + local Worker preview |
| `npm run deploy` | OpenNext build + deploy to Cloudflare |
| `npm run cf-typegen` | Regenerate `cloudflare-env.d.ts` from `wrangler.toml` |

## Content Pipeline

Markdown lives in:

- `_lessons/` — educational content
- `_updates/` — project updates
- `_posts/` — legacy; scheduled for removal

Scripts in `scripts/generate-*-data.js` parse frontmatter and emit JSON maps under `src/generated/`. Run `npm run prebuild-all` after editing any markdown.

## Deployment

Target: **Cloudflare Workers** via `@opennextjs/cloudflare`.

- `build.sh` runs `npm run prebuild-all` then `npx opennextjs-cloudflare build`.
- `wrangler.toml` holds Worker config, bindings, and compat flags.
- `open-next.config.ts` controls the OpenNext adapter.
- Secrets use `wrangler secret put` (not committed).

## Environment Variables

- `.env.dev`, `.env.staging`, `.env.prod` — build-time env per target, committed.
- `.dev.vars` — local-only secrets consumed by `wrangler dev`; gitignored.
- Cloudflare Worker secrets: set via `wrangler secret put <NAME>`.

Type definitions for Worker bindings live in `cloudflare-env.d.ts`; regenerate with `npm run cf-typegen` after editing `wrangler.toml`.

## Architecture Notes

- `src/app/` — App Router entry points, grouped by route: `(main)`, `(exchange)`, `(iframe)`, `(veera)`.
- `src/sites/` — Feature code per site (`tari-dot-com`, `exchange`, `Swap`).
- `src/services/` — Data fetching, API clients, stores.
- `src/ui-shared/` — Cross-site components, hooks, layouts.
- `src/proxy.ts` — Next 16 replacement for `middleware.ts`. Handles redirects and rewrites.
- `src/generated/` — Build-time JSON from markdown; do not edit by hand.

## Ongoing Work

See `tasks/todo.md` for the Next.js 16 + OpenNext migration plan and remediation phases.
