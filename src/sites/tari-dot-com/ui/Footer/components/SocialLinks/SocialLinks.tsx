'use client';

import { useMainStore } from '@/services/stores/useMainStore';
import BlueskyIcon from './icons/BlueskyIcon';
import DiscordIcon from './icons/DiscordIcon';
import GithubIcon from './icons/GithubIcon';
import TelegramIcon from './icons/TelegramIcon';
import XIcon from './icons/XIcon';
import YoutubeIcon from './icons/YoutubeIcon';
import { Wrapper, SocialIcon } from './styles';

export const SocialIconButtons = () => {
    const { setShowMobileMenu } = useMainStore();

    const handleLinkClick = () => {
        setShowMobileMenu(false);
    };

    return (
        <>
            <SocialIcon
                href="https://twitter.com/tari"
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                aria-label="Tari on X"
            >
                <XIcon />
            </SocialIcon>
            <SocialIcon
                href="https://bsky.app/profile/tariproject.bsky.social"
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                aria-label="Tari on Bluesky"
            >
                <BlueskyIcon />
            </SocialIcon>
            <SocialIcon
                href="https://t.me/tariproject"
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                aria-label="Tari on Telegram"
            >
                <TelegramIcon />
            </SocialIcon>
            <SocialIcon
                href="https://discord.gg/tari"
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                aria-label="Tari on Discord"
            >
                <DiscordIcon />
            </SocialIcon>
            <SocialIcon
                href="https://github.com/tari-project"
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                aria-label="Tari on GitHub"
            >
                <GithubIcon />
            </SocialIcon>
            <SocialIcon
                href="https://www.youtube.com/@taricommunity"
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                aria-label="Tari on YouTube"
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
