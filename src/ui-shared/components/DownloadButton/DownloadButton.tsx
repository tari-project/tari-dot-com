import { Button, IconWrapper } from './styles';
import Image from 'next/image';
import macIcon from './images/mac-icon.svg';
import WindowsIcon from './images/windows-icon.svg';
import LinuxIcon from './images/linux-icon.svg';
import { Os } from '@/ui-shared/types/downloadTypes';

function DownloadButton({
    selectedOs,
    handleDownload,
    $isDisabled,
}: {
    selectedOs: Os;
    handleDownload: () => void;
    $isDisabled: boolean;
}) {
    const icon = selectedOs === Os.Mac ? macIcon : selectedOs === Os.Windows ? WindowsIcon : LinuxIcon;
    return (
        <Button onClick={handleDownload} $isDisabled={$isDisabled}>
            {$isDisabled ? 'Download unavailable' : `Download for ${selectedOs}`}
            <IconWrapper>
                <Image src={icon} alt="Mac Icon" width={38} height={38} />
            </IconWrapper>
        </Button>
    );
}

export default DownloadButton;
