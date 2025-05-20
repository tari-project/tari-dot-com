import { OsButton, ButtonsWrapper } from './styles';
import MacIcon from '../Icons/MacIcon';
import LinuxIcon from '../Icons/LinuxIcon';
import WindowsIcon from '../Icons/WindowsIcon';
import Typography from '../Typography/Typography';

function DownloadForOs() {
    return (
        <>
            <Typography $variant="h5">Download Tari Universe now</Typography>
            <ButtonsWrapper>
                <OsButton href="https://airdrop.tari.com/api/miner/download/macos?universeReferral=tari-dot-com">
                    Mac
                    <MacIcon fill="#000" />
                </OsButton>
                <OsButton href="https://airdrop.tari.com/api/miner/download/windows?universeReferral=tari-dot-com">
                    Windows
                    <WindowsIcon fill="#000" />
                </OsButton>
                <OsButton href="https://airdrop.tari.com/api/miner/download/linux?universeReferral=tari-dot-com">
                    Linux
                    <LinuxIcon fill="#000" />
                </OsButton>
            </ButtonsWrapper>
        </>
    );
}

export default DownloadForOs;
