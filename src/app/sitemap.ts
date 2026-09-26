import type { MetadataRoute } from 'next';
import { stat, readdir } from 'node:fs/promises';
import path from 'node:path';

let CACHED: MetadataRoute.Sitemap | null = null;

const ROOT = path.dirname(__filename) + '/../../';

const lastModifiedInPaths = async (paths: string[]): Promise<Date> => {
    const dates = await Promise.all(
        paths.map(async (path: string) => {
            await stat(path);
            const stats = await stat(path);
            if (stats.isDirectory()) {
                const contents = await readdir(path);
                if (contents) {
                    return lastModifiedInPaths(contents);
                }
                return stats.mtime;
            }
            return stats.mtime;
        }),
    );
    return dates.sort((a, b) => a.getTime() - b.getTime())[0];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteMap = CACHED || [
        {
            url: 'https://tari.com/',
            lastModified: await lastModifiedInPaths([
                // This isn't working. NextJS is faking the path as through it were /ROOT/src/app/sitemap.ts
                // Why?
                __filename,
                // `${ROOT}sites/tari-dot-com/pages/HomePage`,
                // `${ROOT}sites/tari-dot-com/ui`,
            ]),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ];
    CACHED = siteMap;
    return siteMap;
}
