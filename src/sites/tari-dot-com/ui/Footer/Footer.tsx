'use client';

import TariLogo from '../TariLogo/TariLogo';
import DiscordIcon from './icons/DiscordIcon';
import GithubIcon from './icons/GithubIcon';
import InstagramIcon from './icons/InstagramIcon';
import TelegramIcon from './icons/TelegramIcon';
import TikTokIcon from './icons/TikTokIcon';
import XIcon from './icons/XIcon';
import YoutubeIcon from './icons/YoutubeIcon';
import {
    Wrapper,
    LinksWrapper,
    Column,
    Title,
    Links,
    StyledLink,
    Copyright,
    Holder,
    Middle,
    SocialWrapper,
    SocialIcon,
} from './styles';

export default function Footer() {
    return (
        <Wrapper>
            <Holder>
                <TariLogo href="/" />

                <Middle>
                    <LinksWrapper>
                        <Column>
                            <Title>Participate</Title>

                            <Links>
                                <StyledLink href="#">Mine</StyledLink>
                                <StyledLink href="#">Airdrop</StyledLink>
                                <StyledLink href="#">Tokenomics</StyledLink>
                                <StyledLink href="#">Block Explorer</StyledLink>
                                <StyledLink href="#">Downloads</StyledLink>
                            </Links>
                        </Column>

                        <Column>
                            <Title>Build</Title>

                            <Links>
                                <StyledLink href="#">Docs</StyledLink>
                                <StyledLink href="#">Tari Tracker</StyledLink>
                                <StyledLink href="#">Tari Labs University</StyledLink>
                            </Links>
                        </Column>

                        <Column>
                            <Title>Community</Title>

                            <Links>
                                <StyledLink href="#">Tari Labs</StyledLink>
                                <StyledLink href="#">Updates</StyledLink>
                                <StyledLink href="#">TTL Store</StyledLink>
                            </Links>
                        </Column>
                    </LinksWrapper>

                    <SocialWrapper>
                        <SocialIcon href="https://twitter.com/tari" target="_blank" rel="noreferrer">
                            <XIcon />
                        </SocialIcon>
                        <SocialIcon href="https://t.me/tariproject" target="_blank" rel="noreferrer">
                            <TelegramIcon />
                        </SocialIcon>
                        <SocialIcon href="https://discord.gg/tari" target="_blank" rel="noreferrer">
                            <DiscordIcon />
                        </SocialIcon>
                        <SocialIcon href="https://www.tiktok.com/@tari_xtr" target="_blank" rel="noreferrer">
                            <TikTokIcon />
                        </SocialIcon>
                        <SocialIcon href="https://github.com/tari-project" target="_blank" rel="noreferrer">
                            <GithubIcon />
                        </SocialIcon>
                        <SocialIcon
                            href="https://www.youtube.com/channel/UCFjcsEiAtr9mC1Yt0uJ-3xA"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <YoutubeIcon />
                        </SocialIcon>
                        <SocialIcon href="https://www.instagram.com/tari_xtr" target="_blank" rel="noreferrer">
                            <InstagramIcon />
                        </SocialIcon>
                    </SocialWrapper>
                </Middle>

                <Copyright>© {new Date().getFullYear()} — Tari Labs All Rights Reserved</Copyright>
            </Holder>
        </Wrapper>
    );
}
