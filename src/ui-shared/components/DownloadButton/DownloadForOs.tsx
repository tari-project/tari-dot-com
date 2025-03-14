'use client';
import { OsButton, ButtonsWrapper } from './styles';
import MacIcon from '../Icons/MacIcon';
import LinuxIcon from '../Icons/LinuxIcon';
import WindowsIcon from '../Icons/WindowsIcon';
import Typography from '../Typography/Typography';
import { useDownloadUniverse } from '@/services/api/useDownloadUniverse';

function DownloadForOs() {
    const { handleDownloadClick } = useDownloadUniverse();

    return (
        <>
            <Typography $variant="h5">Download Tari Universe now</Typography>
            <ButtonsWrapper>
                <OsButton onClick={(e) => handleDownloadClick(e, 'macos')}>
                    Mac
                    <MacIcon fill="#000" />
                </OsButton>
                <OsButton onClick={(e) => handleDownloadClick(e, 'windows')}>
                    Windows
                    <WindowsIcon fill="#000" />
                </OsButton>
                <OsButton onClick={(e) => handleDownloadClick(e, 'linux')}>
                    Linux
                    <LinuxIcon fill="#000" />
                </OsButton>
            </ButtonsWrapper>
        </>
    );
}

export default DownloadForOs;
