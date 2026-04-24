# CLAUDE.md

Guidance for Claude Code (and other AI agents) working in this repository. See `AGENTS.md` for workflow rules and `README.md` for contributor setup.

## Stack

- Next.js **16** (App Router, Turbopack is the default bundler in Next 16)
- React 19, TypeScript
- **@opennextjs/cloudflare 1.19+** targeting **Cloudflare Workers** (not Pages, not `@cloudflare/next-on-pages`)
- styled-components, motion, zustand, @tanstack/react-query
- wagmi / viem / @reown/appkit for the swap iframe

## Development Commands

### Build & dev
- `npm run dev` — Next dev server (Turbopack)
- `npm run build` — Next production build
- `npm run start` — serve the Next build
- `npm run pages:build` — OpenNext Cloudflare Worker build (legacy script name; a rename to `worker:build` is tracked in `tasks/todo.md` Phase 10)
- `npm run preview` — OpenNext build + local Worker preview
- `npm run deploy` — OpenNext build + deploy
- `npm run cf-typegen` — regenerate `cloudflare-env.d.ts` from `wrangler.toml`

### Code quality
- `npm run lint`, `npm run lint:fix`
- `npm run format`, `npm run format:check`

### Content generation
- `npm run prebuild-updates`, `npm run prebuild-lessons`
- `npm run prebuild-all` — runs all generators

Run `npm run prebuild-all` before the first `dev` or `build`. The app imports `src/generated/*.json` produced by these scripts; those files are not committed.

## Project Architecture

### Route structure (`src/app/`)

- `(main)` — `tari.com` marketing site
- `(exchange)` — exchange pages
- `(iframe)` — embedded swap widget
- `(veera)` — Veera-specific pages

### Key directories

- `src/sites/` — feature code per site
  - `tari-dot-com/` — main site
  - `exchange/` — exchange pages
  - `Swap/` — swap widget
- `src/services/` — API clients, data access
- `src/ui-shared/` — shared components, hooks, layouts
- `src/stores/` — zustand stores (consolidation in flight; see Phase 9)
- `src/generated/` — **build-time JSON** produced by `npm run prebuild-all`; do not edit
- `src/proxy.ts` — Next 16 replacement for `middleware.ts`. Handles redirects and rewrites.

### Content

Markdown in `_lessons/` and `_updates/` is compiled to JSON by `scripts/generate-*-data.js` at prebuild time. The `_posts/` pipeline is being removed (Phase 1).

### Styling & design system

- styled-components with a theme in `src/theme/`
- motion (Framer Motion) for animation
- Fonts: Alliance, Druk, Poppins
- Mobile-first responsive

### State management

- zustand for global client state (`src/stores/`)
- React Query for remote data and caching
- Some legacy stores remain in `src/services/stores/` (consolidation pending)

## Code Style

- TypeScript required
- No code comments (project convention)
- Prettier: 120-char line width, single quotes, 4-space tabs
- Component layout: one directory per component, `ComponentName.tsx` + `styles.ts`
- styled-components transient props prefixed with `$`
- PascalCase for components, camelCase for utilities, kebab-case for assets

## Deployment

- Target: **Cloudflare Workers** via `@opennextjs/cloudflare`
- `build.sh` runs `npm run prebuild-all` then `npx opennextjs-cloudflare build`
- `wrangler.toml` — Worker config, bindings, compat flags
- `open-next.config.ts` — OpenNext adapter config
- Secrets via `wrangler secret put`; local secrets in `.dev.vars`
- Build-time env in `.env.dev`, `.env.staging`, `.env.prod`

## Next.js 16 Expectations

- Prefer server components; opt into `'use client'` only for interactive islands
- Use `generateStaticParams` and `'use cache'` for content routes known at build time
- Put explicit cache policy (`cache`, `next.revalidate`, `no-store`) on every server-side `fetch`
- Worker runtime constraints apply: no Node APIs outside the Node compat shim; no internal `fetch` when `global_fetch_strictly_public` is on — use service bindings instead
- `src/proxy.ts` replaces `middleware.ts`; keep its matcher narrow

## Ongoing Remediation

Active migration work is tracked in `tasks/todo.md`. Check the current phase before making broad edits; several files are mid-migration.
