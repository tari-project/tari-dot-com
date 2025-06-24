/* eslint-disable @typescript-eslint/no-explicit-any */

interface Download {
    url: string;
    path: string;
    size: string;
    lastModified: string;
    sha256: string | null;
    network: string;
    arch: string;
}

export interface OrganizedDownloads {
    linux: Download[];
    osx: Download[];
    windows: Download[];
}

function extractNetworkAndArchitecture(path: string): { network: string; arch: string; os: string } {
    const parts = path.split('/');
    const os = parts[1];
    const network = parts[2];
    const arch = parts[parts.length - 1].split('-').pop()?.split('.')[0] || '';
    return { network, arch, os };
}

export function organizeDownloads(data: any): { downloadLinks: Download[]; organizedDownloads: OrganizedDownloads } {
    const downloadLinks: Download[] = [
        ...data['current/linux'].map((item: any) => {
            const { network, arch, os } = extractNetworkAndArchitecture(item.path);
            return { ...item, network, arch, os };
        }),
        ...data['current/osx'].map((item: any) => {
            const { network, arch, os } = extractNetworkAndArchitecture(item.path);
            return { ...item, network, arch, os };
        }),
        ...data['current/windows'].map((item: any) => {
            const { network, arch, os } = extractNetworkAndArchitecture(item.path);
            return { ...item, network, arch, os };
        }),
    ];

    const organizedDownloads: OrganizedDownloads = {
        linux: data['current/linux'].map((item: any) => {
            const { network, arch, os } = extractNetworkAndArchitecture(item.path);
            return { ...item, network, arch, os };
        }),
        osx: data['current/osx'].map((item: any) => {
            const { network, arch, os } = extractNetworkAndArchitecture(item.path);
            return { ...item, network, arch, os };
        }),
        windows: data['current/windows'].map((item: any) => {
            const { network, arch, os } = extractNetworkAndArchitecture(item.path);
            return { ...item, network, arch, os };
        }),
    };

    return { downloadLinks, organizedDownloads };
}

export function getLatestDownload(organizedDownloads: OrganizedDownloads): {
    linux: { [key: string]: Download | null };
    osx: { [key: string]: Download | null };
    windows: { [key: string]: Download | null };
} {
    const getLatestByGroup = (downloads: Download[]): { [key: string]: Download | null } => {
        const filteredDownloads = downloads.filter((download) => !download.url.endsWith('.sha256'));
        const grouped: { [key: string]: Download[] } = filteredDownloads.reduce(
            (acc, download) => {
                const key = `${download.network}-${download.arch}`;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(download);
                return acc;
            },
            {} as { [key: string]: Download[] },
        );

        const latestByGroup: { [key: string]: Download | null } = {};
        for (const key in grouped) {
            latestByGroup[key] = grouped[key].reduce((latest, current) =>
                new Date(latest.lastModified) > new Date(current.lastModified) ? latest : current,
            );
        }

        return latestByGroup;
    };

    return {
        linux: getLatestByGroup(organizedDownloads.linux),
        osx: getLatestByGroup(organizedDownloads.osx),
        windows: getLatestByGroup(organizedDownloads.windows),
    };
}
