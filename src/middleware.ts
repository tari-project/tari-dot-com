import { NextRequest, NextResponse } from 'next/server';

const COMMUNITY_TEMPLATES_URL =
    process.env.COMMUNITY_TEMPLATES_URL ?? 'https://ootle-templates-esme.tari.com';

// NOTE: Kept as `middleware.ts` (not renamed to `proxy.ts`) because
// @opennextjs/cloudflare does not yet support the Next.js 16 `proxy.ts`
// convention — it only runs in the Node.js runtime, which the Cloudflare
// Workers adapter rejects at build time with:
//   "Node.js middleware is not currently supported."
// See: https://github.com/opennextjs/opennextjs-cloudflare/issues/1213
// Revisit once the adapter supports Next.js 16 proxy / Node middleware.
export async function middleware(request: NextRequest) {
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
    matcher: ['/launchpad/:path*', '/ootle/community-templates/:path*'],
    runtime: 'experimental-edge',
};
