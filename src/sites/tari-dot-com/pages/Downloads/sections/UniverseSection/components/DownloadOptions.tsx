'use client';
import { OptionsWrapper } from './styles';
import { useState, useEffect } from 'react';
import NewDownloadButton from '@/components/DownloadButton/DownloadButton';
import DropDown from '@/components/DropDown/DropDown';

type Os = 'Mac' | 'Windows' | 'Linux';

function DownloadOptions() {
    const [selectedOs, setSelectedOs] = useState<Os>('Linux');

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

    const handleOsChange = (selected: string) => {
        setSelectedOs(selected as Os);
    };

    return (
        <OptionsWrapper>
            <DropDown
                options={[
                    { value: 'Mac', label: 'Mac' },
                    { value: 'Windows', label: 'Windows' },
                    { value: 'Linux', label: 'Linux' },
                ]}
                label="Operating System"
                selected={selectedOs}
                onChange={handleOsChange}
            />
            <NewDownloadButton selectedOs={selectedOs} handleDownload={handleDownload} />
        </OptionsWrapper>
    );
}

export default DownloadOptions;
