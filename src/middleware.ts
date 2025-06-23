import { NextRequest, NextResponse } from 'next/server';
export async function middleware(request: NextRequest) {
    const { pathname: urlPath, origin } = request.nextUrl;
    if (urlPath.includes('/launchpad')) {
        const url = new URL(origin + '/downloads');
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/(.*)'],
};

