# Migrate to @opennextjs/cloudflare Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace `@cloudflare/next-on-pages` with `@opennextjs/cloudflare` so the app runs on Cloudflare Workers (not Pages) with full Node.js compat and working external rewrites via middleware.

**Architecture:** `@opennextjs/cloudflare` compiles Next.js to a standard Cloudflare Worker (`worker.js`) with static assets served separately. It supports the Node.js runtime (not edge-only), so `export const runtime = 'edge'` must be removed from all route files. The build pipeline in `build.sh` is replaced by `opennextjs-cloudflare build`.

**Tech Stack:** Next.js 15, `@opennextjs/cloudflare`, Wrangler, Cloudflare Workers (not Pages)

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install @opennextjs/cloudflare and latest wrangler**

```bash
npm install @opennextjs/cloudflare@latest
npm install --save-dev wrangler@latest
```

**Step 2: Verify installed versions**

```bash
cat package.json | grep -E "opennextjs|wrangler"
```

Expected: `@opennextjs/cloudflare` and `wrangler` >= `3.99.0` present.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install @opennextjs/cloudflare and latest wrangler"
```

---

### Task 2: Update next.config.mjs

**Files:**
- Modify: `next.config.mjs`

Replace the `@cloudflare/next-on-pages/next-dev` setup with `initOpenNextCloudflareForDev`.

**Step 1: Update next.config.mjs**

Replace the entire file with:

```js
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    async redirects() {
        return [
            {
                source: '/whitepaper',
                destination: '/mica-whitepaper',
                permanent: true,
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/updates/:slug.html',
                destination: '/updates/:slug',
            },
            {
                source: '/lessons/:slug.html',
                destination: '/lessons/:slug',
            },
        ];
    },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
```

**Step 2: Commit**

```bash
git add next.config.mjs
git commit -m "chore: replace next-on-pages dev setup with opennextjs"
```

---

### Task 3: Replace wrangler.toml

**Files:**
- Modify: `wrangler.toml`

`@opennextjs/cloudflare` targets Cloudflare **Workers** (not Pages). The output is `.open-next/worker.js` with assets at `.open-next/assets`.

**Step 1: Replace wrangler.toml**

```toml
name = "tari-dot-com-2025"
main = ".open-next/worker.js"
compatibility_date = "2024-12-30"
compatibility_flags = ["nodejs_compat", "global_fetch_strictly_public"]

[assets]
directory = ".open-next/assets"
binding = "ASSETS"

[[services]]
binding = "WORKER_SELF_REFERENCE"
service = "tari-dot-com-2025"
```

**Step 2: Commit**

```bash
git add wrangler.toml
git commit -m "chore: update wrangler.toml for opennextjs-cloudflare"
```

---

### Task 4: Add open-next.config.ts

**Files:**
- Create: `open-next.config.ts`

**Step 1: Create open-next.config.ts**

```ts
import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig();
```

**Step 2: Commit**

```bash
git add open-next.config.ts
git commit -m "chore: add open-next.config.ts"
```

---

### Task 5: Add .dev.vars

**Files:**
- Create: `.dev.vars`

**Step 1: Create .dev.vars**

```
NEXTJS_ENV=development
```

**Step 2: Add to .gitignore if it contains secrets (it doesn't here, but check)**

```bash
grep ".dev.vars" .gitignore || echo ".dev.vars" >> .gitignore
```

**Step 3: Commit**

```bash
git add .dev.vars .gitignore
git commit -m "chore: add .dev.vars for opennextjs local dev"
```

---

### Task 6: Update package.json scripts

**Files:**
- Modify: `package.json`

**Step 1: Update scripts**

Replace or add these scripts in `package.json`:

```json
"build": "next build",
"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
"pages:build": "opennextjs-cloudflare build",
"cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
```

Remove: `"pages:build": "npx @cloudflare/next-on-pages"` and the old `"preview"` / `"deploy"` scripts.

**Step 2: Commit**

```bash
git add package.json
git commit -m "chore: update package.json scripts for opennextjs-cloudflare"
```

---

### Task 7: Update build.sh

**Files:**
- Modify: `build.sh`

The Cloudflare Pages CI build script needs to call `opennextjs-cloudflare build` instead of `npx @cloudflare/next-on-pages@1`.

**Step 1: Update build.sh**

```bash
#!/bin/bash
set -ex

set -a
if [ "$CF_PAGES_BRANCH" == "prod" ]; then
  source .env.prod
elif [ "$CF_PAGES_BRANCH" == "staging" ]; then
  source .env.staging
elif [ "$CF_PAGES_BRANCH" == "dev" ]; then
  source .env.dev
else
  BRANCH_URL=${CF_PAGES_BRANCH//\//-}
  export NEXT_PUBLIC_BASE_URL="https://$BRANCH_URL.tari-dot-com-2025.pages.dev"
  source .env.dev
fi
set +a

npx opennextjs-cloudflare build
```

**Step 2: Commit**

```bash
git add build.sh
git commit -m "chore: update build.sh to use opennextjs-cloudflare"
```

---

### Task 8: Remove export const runtime = 'edge' from all route files

**Files to modify (15 files):**
- `src/app/(exchange)/exchange/[name]/page.tsx`
- `src/app/(main)/faq/page.tsx`
- `src/app/(main)/lessons/[slug]/page.tsx`
- `src/app/(main)/lessons/page.tsx`
- `src/app/(main)/integration-guide/page.tsx`
- `src/app/(main)/(legal)/privacy_policy/page.tsx`
- `src/app/(main)/(legal)/disclaimer/page.tsx`
- `src/app/(main)/(legal)/user_agreement/page.tsx`
- `src/app/(main)/page.tsx`
- `src/app/(main)/tokenomics/page.tsx`
- `src/app/(main)/downloads/page.tsx`
- `src/app/(main)/updates/[slug]/page.tsx`
- `src/app/(main)/updates/page.tsx`
- `src/app/(iframe)/swaps/page.tsx`
- `src/app/(veera)/veera/page.tsx`

**Step 1: Remove the line from all files at once**

```bash
sed -i "/export const runtime = 'edge';/d" \
  src/app/\(exchange\)/exchange/\[name\]/page.tsx \
  src/app/\(main\)/faq/page.tsx \
  src/app/\(main\)/lessons/\[slug\]/page.tsx \
  src/app/\(main\)/lessons/page.tsx \
  src/app/\(main\)/integration-guide/page.tsx \
  "src/app/(main)/(legal)/privacy_policy/page.tsx" \
  "src/app/(main)/(legal)/disclaimer/page.tsx" \
  "src/app/(main)/(legal)/user_agreement/page.tsx" \
  "src/app/(main)/page.tsx" \
  "src/app/(main)/tokenomics/page.tsx" \
  "src/app/(main)/downloads/page.tsx" \
  "src/app/(main)/updates/[slug]/page.tsx" \
  "src/app/(main)/updates/page.tsx" \
  "src/app/(iframe)/swaps/page.tsx" \
  "src/app/(veera)/veera/page.tsx"
```

**Step 2: Verify none remain**

```bash
rg "export const runtime" src/
```

Expected: no output.

**Step 3: Commit**

```bash
git add src/
git commit -m "chore: remove export const runtime = 'edge' (not supported by opennextjs)"
```

---

### Task 9: Remove @cloudflare/next-on-pages

**Files:**
- Modify: `package.json`

**Step 1: Uninstall**

```bash
npm uninstall @cloudflare/next-on-pages eslint-plugin-next-on-pages
```

**Step 2: Verify**

```bash
cat package.json | grep next-on-pages
```

Expected: no output.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: remove @cloudflare/next-on-pages"
```

---

### Task 10: Update .gitignore

**Files:**
- Modify: `.gitignore`

**Step 1: Add .open-next**

```bash
grep ".open-next" .gitignore || echo ".open-next" >> .gitignore
```

**Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: add .open-next to .gitignore"
```

---

### Task 11: Test build locally

**Step 1: Run the build**

```bash
npx opennextjs-cloudflare build 2>&1 | tail -30
```

Expected: build completes, `.open-next/worker.js` and `.open-next/assets` are created.

**Step 2: Check for errors**

If build fails with TypeScript errors or missing module errors, fix them before proceeding.

**Step 3: Verify middleware still works**

Check `src/middleware.ts` — `NextResponse.rewrite()` is supported by `@opennextjs/cloudflare`. No changes needed.

---

### Task 12: Update middleware to use NextResponse.rewrite (already done)

**Files:**
- `src/middleware.ts` — already updated to use `NextResponse.rewrite(upstreamUrl)`. No action needed, just verify.

```bash
cat src/middleware.ts
```

Expected: proxy block uses `return NextResponse.rewrite(upstreamUrl)`.

---

### Task 13: Add static asset cache headers

**Files:**
- Create: `public/_headers`

Required by `@opennextjs/cloudflare` for correct static asset caching.

**Step 1: Create public/_headers**

```
/_next/static/*
  Cache-Control: public,max-age=31536000,immutable
```

**Step 2: Commit**

```bash
git add public/_headers
git commit -m "chore: add static asset cache headers for opennextjs"
```

---

### Final verification

After deploying:

```bash
curl -sI https://tari.com/ootle/community-templates | grep "^HTTP"
curl -sI https://tari.com/ootle/community-templates/assets/index-DNX9wXFP.css | grep "^HTTP"
curl -sI https://tari.com/ootle/community-templates/api/templates/featured | grep "^HTTP"
curl -sI "https://tari.com/ootle/community-templates/templates/87fad2c8a3ff789a9b638a6d490738f950faa1e8a83960e7c334da3e66959314" | grep "^HTTP"
```

All should return `HTTP/2 200`.
