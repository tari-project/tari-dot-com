'use client';

import TariLogo from '../TariLogo/TariLogo';
import SocialLinks from './components/SocialLinks/SocialLinks';

import { Wrapper, LinksWrapper, Column, Title, Links, StyledLink, Copyright, Holder, Middle } from './styles';

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
                                <StyledLink href="/downloads">Mine</StyledLink>
                                <StyledLink href="https://airdrop.tari.com/">Airdrop</StyledLink>
                                <StyledLink href="https://airdrop.tari.com/tokenomics">Tokenomics</StyledLink>
                                <StyledLink href="https://explore-nextnet.tari.com/">Block Explorer</StyledLink>
                                <StyledLink href="/downloads">Downloads</StyledLink>
                            </Links>
                        </Column>

                        <Column>
                            <Title>Build</Title>
                            <Links>
                                <StyledLink href="https://rfc.tari.com/">Docs</StyledLink>
                                <StyledLink href="https://tlu.tarilabs.com/">Tari Labs University</StyledLink>
                            </Links>
                        </Column>

                        <Column>
                            <Title>Community</Title>
                            <Links>
                                <StyledLink href="https://tarilabs.com/">Tari Labs</StyledLink>
                                <StyledLink href="/updates">Updates</StyledLink>
                                <StyledLink href="https://store.tarilabs.com/">TTL Store</StyledLink>
                            </Links>
                        </Column>
                    </LinksWrapper>

                    <SocialLinks />
                </Middle>

                <Copyright>© {new Date().getFullYear()} — Tari Labs All Rights Reserved</Copyright>
            </Holder>
        </Wrapper>
    );
}
