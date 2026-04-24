import { NextRequest, NextResponse } from 'next/server';

const COMMUNITY_TEMPLATES_URL =
    process.env.COMMUNITY_TEMPLATES_URL ?? 'https://ootle-templates-esme.tari.com';

// Hop-by-hop headers that must not be forwarded end-to-end (RFC 7230 §6.1).
const HOP_BY_HOP_HEADERS = new Set([
    'connection',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailer',
    'transfer-encoding',
    'upgrade',
    // Cloudflare strips these, but we drop them explicitly to stay safe.
    'content-length',
    'content-encoding',
]);

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
    //
    // We do the HTTP fetch ourselves instead of using Next.js rewrites
    // (next.config rewrites() OR NextResponse.rewrite() with an absolute URL):
    // on the OpenNext Cloudflare Workers adapter, Next's rewrite machinery
    // does not proxy external origins — the request never reaches fetch().
    // Middleware runs inside the Worker, so a plain fetch() gives us a true
    // HTTP proxy with full control over headers, streaming, and status codes.
    //
    // `global_fetch_strictly_public` is set in wrangler.toml; the upstream
    // host is public, so this is allowed.
    if (urlPath.startsWith('/ootle/community-templates')) {
        const upstreamUrl = new URL(
            request.nextUrl.pathname + request.nextUrl.search,
            COMMUNITY_TEMPLATES_URL,
        );

        const requestHeaders = new Headers(request.headers);
        for (const header of HOP_BY_HOP_HEADERS) {
            requestHeaders.delete(header);
        }
        // Upstream should see its own host, not tari.com.
        requestHeaders.set('host', upstreamUrl.host);
        // Preserve client IP for upstream logs.
        const forwardedFor = request.headers.get('x-forwarded-for');
        const clientIp = request.headers.get('cf-connecting-ip');
        if (clientIp) {
            requestHeaders.set(
                'x-forwarded-for',
                forwardedFor ? `${forwardedFor}, ${clientIp}` : clientIp,
            );
        }
        requestHeaders.set('x-forwarded-host', request.nextUrl.host);
        requestHeaders.set('x-forwarded-proto', request.nextUrl.protocol.replace(':', ''));

        const hasBody = request.method !== 'GET' && request.method !== 'HEAD';

        const upstreamResponse = await fetch(upstreamUrl, {
            method: request.method,
            headers: requestHeaders,
            body: hasBody ? request.body : undefined,
            redirect: 'manual',
        });

        const responseHeaders = new Headers(upstreamResponse.headers);
        for (const header of HOP_BY_HOP_HEADERS) {
            responseHeaders.delete(header);
        }

        return new NextResponse(upstreamResponse.body, {
            status: upstreamResponse.status,
            statusText: upstreamResponse.statusText,
            headers: responseHeaders,
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/launchpad/:path*', '/ootle/community-templates/:path*'],
    runtime: 'experimental-edge',
};
