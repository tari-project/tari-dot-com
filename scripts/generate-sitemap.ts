import { spawn } from 'node:child_process';
import path from 'node:path';
import { readFile, writeFile } from 'fs/promises';

const ROOT = path.dirname(import.meta.filename) + '/../';

const gitLastModified = async (pathName: string): Promise<Date> => {
    let { stdout } = await sh('git', ['log', '-1', '--pretty=format:%cI', pathName]);
    stdout = stdout.trim();
    return new Date(stdout);
};

interface Route {
    url: string;
    lastModified: Date;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
}

interface PageEntry {
    // Not bothering with the rest of the data here.
    date?: string;
}

type PageEntryMap = Record<string, PageEntry>;

const sh = (cmd: string, args: string[]) => {
    return new Promise<{ stdout: string; stderr: string }>(function (resolve, reject) {
        let stdout = '';
        let stderr = '';
        const proc = spawn(cmd, args);
        proc.stdout.on('data', (data: string) => {
            stdout += data;
        });
        proc.stderr.on('data', (data: string) => {
            stderr += data;
        });
        proc.on('close', (code) => {
            if (code) {
                reject(
                    new Error(
                        `Command ${cmd} with args ${args} Exited with error code ${code}. Stderr was:\n${stderr}`,
                    ),
                );
                return;
            }
            resolve({ stdout, stderr });
        });
    });
};

const lastModifiedInPaths = async (paths: string[]): Promise<Date> => {
    const dates = await Promise.all(
        paths.map(async (path: string) => {
            return gitLastModified(path);
        }),
    );
    return dates.sort((a, b) => b.getTime() - a.getTime())[0];
};

const routesFromJSON = async (prefix: string, pathName: string, fallbackDate: Date = new Date()): Promise<Route[]> => {
    const entries: PageEntryMap = JSON.parse(await readFile(pathName, 'utf8'));
    return Object.entries(entries).map(([slug, entry]) => ({
        url: `${prefix}/${slug}`,
        lastModified: new Date(entry.date || fallbackDate),
        changeFrequency: 'yearly',
        priority: 0.5,
    }));
};

const buildRoutes = async (): Promise<Route[]> => {
    return [
        {
            url: 'https://tari.com/',
            lastModified: await lastModifiedInPaths([
                'src/sites/tari-dot-com/pages/HomePage',
                'src/sites/tari-dot-com/ui',
            ]),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://tari.com/downloads',
            lastModified: await lastModifiedInPaths(['src/sites/tari-dot-com/pages/Downloads']),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: 'https://tari.com/integration-guide',
            lastModified: await lastModifiedInPaths(['src/sites/tari-dot-com/pages/IntegrationPage']),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: 'https://tari.com/privacy_policy',
            lastModified: await lastModifiedInPaths(['src/sites/tari-dot-com/pages/LegalPages/PrivacyPolicy.tsx']),
            changeFrequency: 'yearly',
            priority: 0.1,
        },
        {
            url: 'https://tari.com/user_agreement',
            lastModified: await lastModifiedInPaths(['src/sites/tari-dot-com/pages/LegalPages/UserAgreement.tsx']),
            changeFrequency: 'yearly',
            priority: 0.1,
        },
        {
            url: 'https://tari.com/disclaimer',
            lastModified: await lastModifiedInPaths(['src/sites/tari-dot-com/pages/LegalPages/Disclaimer.tsx']),
            changeFrequency: 'yearly',
            priority: 0.1,
        },
        {
            url: 'https://tari.com/lessons',
            lastModified: await lastModifiedInPaths(['src/sites/tari-dot-com/pages/LessonsPage', '_lessons']),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://tari.com/updates',
            lastModified: await lastModifiedInPaths(['src/sites/tari-dot-com/pages/UpdatesPage', '_updates']),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://tari.com/mica-whitepaper',
            lastModified: await lastModifiedInPaths(['src/app/mica-whitepaper']),
            changeFrequency: 'yearly',
            priority: 0.2,
        },
        {
            url: 'https://tari.com/tokenomics',
            lastModified: await lastModifiedInPaths(['src/sites/tari-dot-com/pages/TokenomicsPage']),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...(await routesFromJSON('https://tari.com/updates', 'src/generated/updates-map.json')),
        ...(await routesFromJSON(
            'https://tari.com/lessons',
            'src/generated/lessons-map.json',
            await lastModifiedInPaths(['_lessons']),
        )),
    ];
};

const genSiteMap = async () => {
    const routes = await buildRoutes();
    const innerBlocks = routes.map(
        (route) => `
  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastModified.toISOString()}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    );
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${innerBlocks.join('')}
</urlset>
`;
};

process.chdir(ROOT);
const data = await genSiteMap();
await writeFile('src/app/sitemap.xml', data);
