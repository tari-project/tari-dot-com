import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
}

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
