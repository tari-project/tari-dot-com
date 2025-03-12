'use client';
import { OsButton, ButtonsWrapper } from './styles';
import MacIcon from '../Icons/MacIcon';
import LinuxIcon from '../Icons/LinuxIcon';
import WindowsIcon from '../Icons/WindowsIcon';
import { Os } from '@/ui-shared/types/downloadTypes';
import Typography from '../Typography/Typography';

function DownloadForOs() {
    const handleDownload = (os: Os) => {
        console.log('Download button clicked', os);
    };

    return (
        <>
            <Typography $variant="h5">Download Tari Universe now</Typography>
            <ButtonsWrapper>
                <OsButton onClick={() => handleDownload(Os.Mac)}>
                    Mac
                    <MacIcon fill="#000" />
                </OsButton>
                <OsButton onClick={() => handleDownload(Os.Windows)}>
                    Windows
                    <WindowsIcon fill="#000" />
                </OsButton>
                <OsButton onClick={() => handleDownload(Os.Linux)}>
                    Linux
                    <LinuxIcon fill="#000" />
                </OsButton>
            </ButtonsWrapper>
        </>
    );
}

export default DownloadForOs;
