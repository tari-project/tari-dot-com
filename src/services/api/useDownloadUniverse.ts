export type DownloadPlatform = 'windows' | 'macos' | 'linux';
import { sendGTMEvent } from '@next/third-parties/google';
import { useExchangeData } from './useExchangeData';

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
    const { data: exchange } = useExchangeData();
    const handleDownload = (platform?: DownloadPlatform) => {
        if (!platform) {
            platform = getPlatform();
        }
        const url = `https://airdrop.tari.com/api/miner/download/${platform}?universeReferral=tari-dot-com`;
        sendGTMEvent({ event: 'download_button_clicked', platform: platform });
        const {
            download_link_mac: macLink,
            download_link_linux: linuxLink,
            download_link_win: winLink,
        } = exchange || {};

        if (exchange) {
            if (platform === 'macos' && macLink) {
                window.open(macLink, '_blank');
            } else if (platform === 'linux' && linuxLink) {
                window.open(linuxLink, '_blank');
            } else if (platform === 'windows' && winLink) {
                window.open(winLink, '_blank');
            }
        }

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
