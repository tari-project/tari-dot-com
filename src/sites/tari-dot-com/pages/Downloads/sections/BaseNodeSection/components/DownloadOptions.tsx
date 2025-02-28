'use client';
import { OptionsWrapper } from './styles';
import { useState, useEffect } from 'react';
import NewDownloadButton from '@/components/DownloadButton/DownloadButton';
import DropDown from '@/components/DropDown/DropDown';

type Os = 'Mac' | 'Windows' | 'Linux';
type Network = 'Mainnet' | 'Nextnet' | 'Testnet';
type Arch = 'x86_64';

function DownloadOptions() {
    const [selectedOs, setSelectedOs] = useState<Os>('Linux');
    const [selectedNetwork, setSelectedNetwork] = useState<string>('Mainnet');
    const [selectedArch, setSelectedArch] = useState<string>('Arm64');

    useEffect(() => {
        const userAgent = window.navigator.userAgent;
        if (userAgent.indexOf('Mac') !== -1) {
            setSelectedOs('Mac');
        } else if (userAgent.indexOf('Windows') !== -1) {
            setSelectedOs('Windows');
        } else if (userAgent.indexOf('Linux') !== -1) {
            setSelectedOs('Linux');
        }
    }, []);

    const handleDownload = () => {
        console.log('Download button clicked');
    };

    // const handleOsChange = (selected: string) => {
    //     setSelectedOs(selected as Os);
    // };

    const handleNetworkChange = (selected: string) => {
        setSelectedNetwork(selected as Network);
    };

    const handleArchChange = (selected: string) => {
        setSelectedArch(selected as Arch);
    };

    return (
        <OptionsWrapper>
            <DropDown
                options={[
                    { value: 'Mainnet', label: 'Mainnet' },
                    { value: 'Nextnet', label: 'Nextnet' },
                    { value: 'Testnet', label: 'Testnet' },
                ]}
                label="Network"
                selected={selectedNetwork}
                onChange={handleNetworkChange}
            />
            <DropDown
                options={[
                    { value: 'Arm64', label: 'Arm64' },
                    { value: 'x86_64', label: 'x86_64' },
                ]}
                label="Architecture"
                selected={selectedArch}
                onChange={handleArchChange}
            />
            <NewDownloadButton selectedOs={selectedOs} handleDownload={handleDownload} />
        </OptionsWrapper>
    );
}

export default DownloadOptions;
