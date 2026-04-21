import { NextRequest, NextResponse } from 'next/server';

const COMMUNITY_TEMPLATES_URL =
    process.env.COMMUNITY_TEMPLATES_URL ?? 'https://ootle-templates-esme.tari.com';

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

        const proxyRequest = new Request(upstreamUrl.toString(), {
            method: request.method,
            headers: request.headers,
            body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
            redirect: 'follow',
        });

        const upstream = await fetch(proxyRequest);

        // Re-wrap the response explicitly. Returning the raw fetch() Response from
        // middleware can cause @cloudflare/next-on-pages to override the status for
        // text/html responses that don't match a Next.js route.
        return new Response(upstream.body, {
            status: upstream.status,
            statusText: upstream.statusText,
            headers: upstream.headers,
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/(.*)'],
};
