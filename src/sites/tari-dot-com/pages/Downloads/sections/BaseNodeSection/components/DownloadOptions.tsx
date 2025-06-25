'use client';

import { useState, useEffect } from 'react';
import { OptionsWrapper } from './styles';
import DropDown from '@/ui-shared/components/DropDown/DropDown';
import DownloadButton from '@/ui-shared/components/DownloadButton/DownloadButton';
import { Network, MacArch, WindowsArch, LinuxArch, Os } from '@/ui-shared/types/downloadTypes';
import { networkOptions, architectureOptions } from '@/ui-shared/hooks/useSetDownloads';
import { useDownloadStore } from '@/services/stores/useDownloadStore';
import { useDownloads } from '@/services/api/useDownloads';
import { getLatestDownload } from '@/sites/tari-dot-com/utils/organizeDownloads';

function DownloadSelector() {
    const [isDisabled, setIsDisabled] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const downloadOptions = useDownloadStore((state) => state.downloadOptions);
    const setDownloadOptions = useDownloadStore((state) => state.setDownloadOptions);
    const { data } = useDownloads();

    const latestDownloads = getLatestDownload(data?.organizedDownloads || { linux: [], osx: [], windows: [] });

    useEffect(() => {
        const { os, network, architecture } = downloadOptions;
        let latestDownload = null;

        if (os === Os.Linux) {
            latestDownload = latestDownloads.linux[`${network}-${architecture}`];
        } else if (os === Os.Mac) {
            latestDownload = latestDownloads.osx[`${network}-${architecture}`];
        } else if (os === Os.Windows) {
            latestDownload = latestDownloads.windows[`${network}-${architecture}`];
        }

        if (latestDownload) {
            setIsDisabled(false);
            setDownloadUrl(latestDownload.url);
        } else {
            setIsDisabled(true);
            setDownloadUrl(null);
        }
    }, [downloadOptions, latestDownloads]);

    const handleDownload = () => {
        if (downloadUrl) {
            window.open(downloadUrl, '_blank');
        } else {
            console.error('No download available for this OS, network, and architecture');
        }
    };

    const handleArchitectureChange = (selected: string) => {
        setDownloadOptions({ ...downloadOptions, architecture: selected as MacArch | WindowsArch | LinuxArch });
    };

    const handleNetworkChange = (selected: string) => {
        setDownloadOptions({ ...downloadOptions, network: selected as Network });
    };

    return (
        <OptionsWrapper>
            <DropDown
                options={networkOptions}
                label="Network"
                selected={downloadOptions.network}
                onChange={handleNetworkChange}
            />
            <DropDown
                options={architectureOptions(downloadOptions.os)}
                label="Architecture"
                selected={downloadOptions.architecture}
                onChange={handleArchitectureChange}
            />
            <DownloadButton
                selectedOs={downloadOptions.os}
                handleDownload={() => handleDownload()}
                $isDisabled={isDisabled}
            />
        </OptionsWrapper>
    );
}

export default DownloadSelector;
