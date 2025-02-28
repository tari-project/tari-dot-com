import { Button, IconWrapper } from './styles';
import Image from 'next/image';
import macIcon from './images/mac-icon.svg';
import WindowsIcon from './images/windows-icon.svg';
import LinuxIcon from './images/linux-icon.svg';

type Os = 'Mac' | 'Windows' | 'Linux';

function DownloadButton({ selectedOs, handleDownload }: { selectedOs: Os; handleDownload: () => void }) {
    const icon = selectedOs === 'Mac' ? macIcon : selectedOs === 'Windows' ? WindowsIcon : LinuxIcon;
    return (
        <Button onClick={handleDownload}>
            Download for {selectedOs}
            <IconWrapper>
                <Image src={icon} alt="Mac Icon" width={38} height={38} />
            </IconWrapper>
        </Button>
    );
}

export default DownloadButton;
