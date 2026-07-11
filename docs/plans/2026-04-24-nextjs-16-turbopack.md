# Next.js 16 + Turbopack Migration Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade from Next.js 15.5.15 to 16.2.4, drop the webpack config block, and clean up now-unnecessary config.

**Architecture:** Bump package versions, remove the webpack fallback in next.config.mjs (Turbopack is now default for both dev and prod), rename middleware.ts to proxy.ts per Next.js 16 convention, and tidy up the dev script.

**Tech Stack:** Next.js 16.2.4, Turbopack (default), @opennextjs/cloudflare 1.19.4, eslint-config-next 16.2.4, @next/third-parties 16.2.4

---

### Task 1: Bump package versions

**Files:**
- Modify: `package.json`

**Step 1: Update next, eslint-config-next, and @next/third-parties to 16.2.4**

In `package.json`, change:
```json
"@next/third-parties": "^15.5.15",
"next": "^15.5.15",
```
to:
```json
"@next/third-parties": "^16.2.4",
"next": "^16.2.4",
```

And in devDependencies:
```json
"eslint-config-next": "^15.5.15",
```
to:
```json
"eslint-config-next": "^16.2.4",
```

Also bump `@opennextjs/cloudflare` from `^1.19.3` to `^1.19.4` (latest, required for Next 16.2.3+ support per peer dep `>=16.2.3`).

**Step 2: Install updated packages**

```bash
npm install
```

Expected: resolves next@16.2.4, no peer dep errors.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: bump Next.js to 16.2.4 and related packages"
```

---

### Task 2: Clean up next.config.mjs

**Files:**
- Modify: `next.config.mjs`

**Step 1: Remove the webpack block and --turbopack flag from dev script**

Turbopack is now the default bundler. The `webpack()` config block is no longer needed for Turbopack (already covered by `turbopack.resolveAlias`). Keep only the `turbopack` block.

Replace the entire file content with:

```js
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    turbopack: {
        resolveAlias: {
            'node:worker_threads': { browser: false },
            porto: false,
            accounts: false,
            '@base-org/account': false,
            '@metamask/connect-evm': false,
        },
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

**Step 2: Update dev script in package.json**

In Next.js 16, Turbopack is the default — the `--turbopack` flag is no longer necessary (but still harmless). Remove it for cleanliness:

Change:
```json
"dev": "next dev --turbopack",
```
to:
```json
"dev": "next dev",
```

**Step 3: Commit**

```bash
git add next.config.mjs package.json
git commit -m "chore: remove webpack config block, Turbopack is now default in Next.js 16"
```

---

### Task 3: Rename middleware.ts to proxy.ts

**Files:**
- Rename: `src/middleware.ts` → `src/proxy.ts`

`middleware.ts` is deprecated in Next.js 16 in favour of `proxy.ts`. The exported function must also be renamed from `middleware` to `proxy`.

**Step 1: Rename the file and update the export**

New content of `src/proxy.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server';

const COMMUNITY_TEMPLATES_URL =
    process.env.COMMUNITY_TEMPLATES_URL ?? 'https://ootle-templates-esme.tari.com';

export async function proxy(request: NextRequest) {
    const { pathname: urlPath, origin } = request.nextUrl;

    if (urlPath.includes('/launchpad')) {
        const url = new URL(origin + '/downloads');
        return NextResponse.redirect(url);
    }

    // Proxy /ootle/community-templates to the external app.
    // Next.js rewrites() to external URLs are silently broken on Cloudflare Pages
    // (@cloudflare/next-on-pages uses _worker.js which bypasses the rewrite engine
    // for external origins). Middleware runs inside the Worker and can fetch() freely.
    if (urlPath.startsWith('/ootle/community-templates')) {
        const upstreamUrl = new URL(
            request.nextUrl.pathname + request.nextUrl.search,
            COMMUNITY_TEMPLATES_URL,
        );

        return NextResponse.rewrite(upstreamUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/(.*)'],
};
```

**Step 2: Delete the old middleware.ts**

```bash
rm src/middleware.ts
```

**Step 3: Commit**

```bash
git add src/proxy.ts src/middleware.ts
git commit -m "chore: rename middleware.ts to proxy.ts per Next.js 16 convention"
```

---

### Task 4: Verify the build

**Step 1: Run a production build**

```bash
npm run build
```

Expected: exits 0, no errors. Output should show `▲ Next.js 16 (Turbopack)`.

**Step 2: Run dev server briefly to confirm startup**

```bash
timeout 15 npm run dev || true
```

Expected: starts without webpack warnings, shows Turbopack banner.

**Step 3: Commit if any fixups were needed, otherwise done**
