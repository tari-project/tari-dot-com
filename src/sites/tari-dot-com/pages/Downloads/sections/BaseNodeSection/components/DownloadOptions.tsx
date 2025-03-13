'use client';

import { OptionsWrapper } from './styles';
import DropDown from '@/ui-shared/components/DropDown/DropDown';
import DownloadButton from '@/ui-shared/components/DownloadButton/DownloadButton';
import { Network, MacArch, WindowsArch, LinuxArch } from '@/ui-shared/types/downloadTypes';
import { networkOptions, architectureOptions } from '@/ui-shared/hooks/useSetDownloads';
import { useDownloadStore } from '@/services/stores/useDownloadStore';

function DownloadSelector() {
    const downloadOptions = useDownloadStore((state) => state.downloadOptions);
    const setDownloadOptions = useDownloadStore((state) => state.setDownloadOptions);
    const handleDownload = () => {
        console.log('Download button clicked');
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
            <DownloadButton selectedOs={downloadOptions.os} handleDownload={handleDownload} />
        </OptionsWrapper>
    );
}

export default DownloadSelector;
