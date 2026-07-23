'use client';

import TariLogo from '../TariLogo/TariLogo';
import SocialLinks from './components/SocialLinks/SocialLinks';

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
    RightSide,
    TariElementImage,
    BottomWrapper,
    LegalLinks,
} from './styles';

import tariElement from './images/tari-element.png';
import Link from 'next/link';

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
                                <StyledLink href="https://airdrop.tari.com/?src=taricom" target="_blank">
                                    Airdrop
                                </StyledLink>
                                <StyledLink href="/tokenomics">Tokenomics</StyledLink>
                                <StyledLink href="https://explore.tari.com/" target="_blank">
                                    Block Explorer
                                </StyledLink>
                                <StyledLink href="/downloads">Downloads</StyledLink>
                            </Links>
                        </Column>

                        <Column>
                            <Title>Build</Title>
                            <Links>
                                <StyledLink href="https://ootle.tari.com/" target="_blank">
                                    Build on Ootle
                                </StyledLink>
                                <StyledLink href="https://ootle.tari.com/community-templates" target="_blank">
                                    Tari Templates
                                </StyledLink>
                                <StyledLink href="https://rfc.tari.com/" target="_blank">
                                    Docs
                                </StyledLink>
                                <StyledLink href="https://tlu.tarilabs.com/" target="_blank">
                                    Tari Labs University
                                </StyledLink>
                                <StyledLink href="/integration-guide/">Integration Guide</StyledLink>
                            </Links>
                        </Column>

                        <Column>
                            <Title>Community</Title>
                            <Links>
                                <StyledLink href="https://community.tari.com/" target="_blank">
                                    Forum
                                </StyledLink>
                                <StyledLink
                                    href="https://github.com/tari-project/rfcs/blob/main/src/TIP-0002_tari_community_charter.md"
                                    target="_blank"
                                >
                                    Tari Community Charter
                                </StyledLink>
                                <StyledLink
                                    href="https://github.com/tari-project/rfcs/blob/main/src/Process/TIP-PROC-0006_core_contributor_program.md"
                                    target="_blank"
                                >
                                    Core Contributor Program
                                </StyledLink>
                            </Links>
                        </Column>
                    </LinksWrapper>

                    <BottomWrapper>
                        <Copyright>
                            © {new Date().getFullYear()}. All Rights Reserved.
                            <LegalLinks>
                                <Link href="/privacy_policy">Privacy Policy</Link>
                                <Link href="/user_agreement">User Agreement</Link>
                            </LegalLinks>
                        </Copyright>
                        <SocialLinks />
                    </BottomWrapper>
                </Middle>

                <RightSide>
                    <TariElementImage src={tariElement.src} alt="Tari Element" />
                </RightSide>
            </Holder>
        </Wrapper>
    );
}
