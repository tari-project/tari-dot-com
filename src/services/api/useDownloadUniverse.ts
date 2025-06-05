export type DownloadPlatform = 'windows' | 'macos' | 'linux';
import { sendGTMEvent } from '@next/third-parties/google';

export const getPlatform = () => {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';

    if (/Mac/i.test(userAgent)) {
        return 'macos';
    } else if (/Windows/i.test(userAgent)) {
        return 'windows';
    } else if (/Linux/i.test(userAgent)) {
        return 'linux';
    } else {
        return 'macos';
    }
};

const checkIsMobile = () => {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
};

export const useDownloadUniverse = () => {
    const handleDownload = (platform?: DownloadPlatform) => {
        if (!platform) {
            platform = getPlatform();
        }
        const url = `https://airdrop.tari.com/api/miner/download/${platform}?universeReferral=tari-dot-com`;
        sendGTMEvent({ event: 'download_button_clicked', platform: platform });

        window.open(url, '_blank');
    };

    const handleDownloadClick = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
        platform?: DownloadPlatform
    ) => {
        const isMobile = checkIsMobile();

        if (!isMobile) {
            e.preventDefault();
            handleDownload(platform);
        }
    };

    return { handleDownload, handleDownloadClick };
};
