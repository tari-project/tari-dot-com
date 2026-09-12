# Tari.com

## Getting started

Install dependencies, create the local Workers environment file, and start Next.js:

```bash
pnpm install --frozen-lockfile
cp .dev.vars.example .dev.vars
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Cloudflare Workers

The production application is built for Cloudflare Workers with the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare/).

```bash
pnpm run build:worker  # Build .open-next/worker.js and static assets
pnpm run preview       # Build and run in the local Workers runtime
pnpm run deploy        # Build and deploy the Worker
pnpm run upload        # Build and upload a version without promoting it
pnpm run cf-typegen     # Regenerate Cloudflare binding types
```

For Cloudflare Workers Builds, use:

- Build command: `pnpm run build:worker`
- Deploy command: `pnpm exec wrangler deploy`
- Non-production deploy command: `pnpm exec wrangler versions upload`

Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `.dev.vars` for local development and as a Workers Builds build variable for deployments. Configure `COMMUNITY_TEMPLATES_URL` as a Worker runtime variable only when overriding its source-code default. Enable Cloudflare Images for the zone because the Worker uses an `IMAGES` binding for Next.js image optimization.

Validate the Worker preview before attaching the `tari.com` and `www.tari.com` custom domains. Keep the Pages deployment available for rollback until the domain cutover is verified.

## Content generation

Run `pnpm run prebuild-all` after editing markdown in `_updates`, `_lessons`, or `_posts` so the generated content maps remain current.
