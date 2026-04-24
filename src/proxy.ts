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
    matcher: ['/launchpad/:path*', '/ootle/community-templates/:path*'],
};
