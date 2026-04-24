const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    turbopack: {
        resolveAlias: {
            porto: './src/empty.ts',
            'porto/internal': './src/empty.ts',
            accounts: './src/empty.ts',
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
