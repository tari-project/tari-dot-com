# Tari.com

## Getting started

Install dependencies, create the local Workers environment file, and start Next.js:

```bash
npm ci
cp .dev.vars.example .dev.vars
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Cloudflare Workers

The production application is built for Cloudflare Workers with the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare/).

```bash
npm run build:worker  # Build .open-next/worker.js and static assets
npm run preview       # Build and run in the local Workers runtime
npm run deploy        # Build and deploy the Worker
npm run upload        # Build and upload a version without promoting it
npm run cf-typegen     # Regenerate Cloudflare binding types
```

For Cloudflare Workers Builds, use:

- Build command: `npm run build:worker`
- Deploy command: `npx wrangler deploy`
- Non-production deploy command: `npx wrangler versions upload`

Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `.dev.vars` for local development and as a Workers Builds build variable for deployments. Configure `COMMUNITY_TEMPLATES_URL` as a Worker runtime variable only when overriding its source-code default. Enable Cloudflare Images for the zone because the Worker uses an `IMAGES` binding for Next.js image optimization.

Validate the Worker preview before attaching the `tari.com` and `www.tari.com` custom domains. Keep the Pages deployment available for rollback until the domain cutover is verified.

## Content generation

Run `npm run prebuild-all` after editing markdown in `_updates`, `_lessons`, or `_posts` so the generated content maps remain current.
