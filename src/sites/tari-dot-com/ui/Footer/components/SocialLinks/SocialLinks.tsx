'use client';

import { useMainStore } from '@/services/stores/useMainStore';
import BlueskyIcon from './icons/BlueskyIcon';
import DiscordIcon from './icons/DiscordIcon';
import GithubIcon from './icons/GithubIcon';
import TelegramIcon from './icons/TelegramIcon';
import XIcon from './icons/XIcon';
import YoutubeIcon from './icons/YoutubeIcon';
import { Wrapper, SocialIcon } from './styles';
import { ScreenReaderH3 } from '@/ui-shared/components/ScreenReaderContent/styles';

export const SocialIconButtons = () => {
    const { setShowMobileMenu } = useMainStore();

    const handleLinkClick = () => {
        setShowMobileMenu(false);
    };

    return (
        <>
            <ScreenReaderH3>Social Links</ScreenReaderH3>
            <SocialIcon
                href="https://x.com/tari"
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                aria-label="X"
            >
                <XIcon />
            </SocialIcon>
            <SocialIcon
                href="https://bsky.app/profile/tariproject.bsky.social"
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                aria-label="BlueSky"
            >
                <BlueskyIcon />
            </SocialIcon>
            <SocialIcon
                href="https://t.me/tariproject"
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                aria-label="Telegram"
            >
                <TelegramIcon />
            </SocialIcon>
            <SocialIcon
                href="https://discord.gg/tari"
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                aria-label="Discord"
            >
                <DiscordIcon />
            </SocialIcon>
            <SocialIcon
                href="https://github.com/tari-project"
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                aria-label="GitHub"
            >
                <GithubIcon />
            </SocialIcon>
            <SocialIcon
                href="https://www.youtube.com/@taricommunity"
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                aria-label="YouTube"
            >
                <YoutubeIcon />
            </SocialIcon>
        </>
    );
};

export default function SocialLinks() {
    return (
        <Wrapper>
            <SocialIconButtons />
        </Wrapper>
    );
}
