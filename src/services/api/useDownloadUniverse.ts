export type DownloadPlatform = 'windows' | 'macos' | 'linux';
import { sendGTMEvent } from '@next/third-parties/google';
import { useExchangeData } from './useExchangeData';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useUIStore } from '@/stores/useUiStore';

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
    const searchParams = useSearchParams();
    const setIsLinux = useUIStore((state) => state.setIsLinux);

    const handleDownload = useCallback(
        (platform?: DownloadPlatform) => {
            if (!platform) {
                platform = getPlatform();
            }
            if (platform === 'linux') {
                setIsLinux(true);
                return;
            } else {
                setIsLinux(false);
            }

            const url = `https://airdrop.tari.com/api/miner/download/${platform}?universeReferral=tari-dot-com`;
            const { download_link_mac: macLink, download_link_win: winLink } = exchange || {};

            // Check if current path contains "vera"
            let exchangeName = exchange?.name;
            if (typeof window !== 'undefined' && window.location.pathname.toLowerCase().includes('veera')) {
                exchangeName = 'veera';
            }

            sendGTMEvent({ event: 'download_button_clicked', platform: platform, exchange: exchangeName });
            if (exchange) {
                if (platform === 'macos' && macLink) {
                    window.open(macLink, '_blank');
                    return;
                } else if (platform === 'windows' && winLink) {
                    window.open(winLink, '_blank');
                    return;
                }
            }

            const formattedUrl = new URL(url);
            if (exchange?.name) {
                formattedUrl.searchParams.set('universeReferral', exchange?.id || '');
            }
            const veeraEmailRef = searchParams.get('veeraEmailRef');
            if (veeraEmailRef) {
                formattedUrl.searchParams.set('veeraEmailRef', veeraEmailRef);
            }

            try {
                // Then trigger the download directly
                const link = document.createElement('a');
                link.href = formattedUrl.toString();
                link.download = '';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Download failed:', error);
                // Fallback to original method
                window.open(formattedUrl.toString(), '_blank');
            }
        },
        [exchange, searchParams, setIsLinux],
    );

    const handleDownloadClick = (
        e:
            | React.MouseEvent<HTMLAnchorElement, MouseEvent>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.FormEvent<HTMLFormElement>,
        platform?: DownloadPlatform,
    ) => {
        const isMobile = checkIsMobile();

        if (!isMobile) {
            e.preventDefault();
            handleDownload(platform);
        }
    };

    return { handleDownload, handleDownloadClick };
};
