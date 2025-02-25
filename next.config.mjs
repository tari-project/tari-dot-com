import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
}

const nextConfig = {
    compiler: {
        styledComponents: true,
    },
};

export default nextConfig;
