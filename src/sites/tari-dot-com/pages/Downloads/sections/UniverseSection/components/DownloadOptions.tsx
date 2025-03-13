'use client';
import DropDown from '@/ui-shared/components/DropDown/DropDown';
import { OptionsWrapper } from './styles';
import { useState, useEffect } from 'react';
import DownloadButton from '@/ui-shared/components/DownloadButton/DownloadButton';
import useDetectOs from '@/ui-shared/hooks/useDetectOs';
import { Os } from '../../../../../../../ui-shared/types/downloadTypes';

function DownloadOptions() {
    const detectedOs = useDetectOs();
    const [selectedOs, setSelectedOs] = useState<Os>(Os.Mac);

    useEffect(() => {
        setSelectedOs(detectedOs);
    }, [detectedOs]);

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
                    { value: Os.Mac, label: 'Mac' },
                    { value: Os.Windows, label: 'Windows' },
                    { value: Os.Linux, label: 'Linux' },
                ]}
                label="Operating System"
                selected={selectedOs}
                onChange={handleOsChange}
            />
            <DownloadButton selectedOs={selectedOs} handleDownload={handleDownload} />
        </OptionsWrapper>
    );
}

export default DownloadOptions;
