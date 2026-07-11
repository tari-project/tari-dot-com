import { NextRequest, NextResponse } from 'next/server';

const COMMUNITY_TEMPLATES_URL = process.env.COMMUNITY_TEMPLATES_URL ?? 'https://ootle-templates-esme.tari.com';

export async function middleware(request: NextRequest) {
    const { pathname: urlPath, origin } = request.nextUrl;

    if (urlPath.includes('/launchpad')) {
        const url = new URL(origin + '/downloads');
        return NextResponse.redirect(url);
    }

    // Proxy /ootle/community-templates to the external app from the Worker.
    if (urlPath.startsWith('/ootle/community-templates')) {
        const upstreamUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, COMMUNITY_TEMPLATES_URL);

        const proxyRequest = new Request(upstreamUrl.toString(), {
            method: request.method,
            headers: request.headers,
            body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
            redirect: 'follow',
        });

        const upstream = await fetch(proxyRequest);

        // Preserve the upstream response metadata while streaming its body.
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
