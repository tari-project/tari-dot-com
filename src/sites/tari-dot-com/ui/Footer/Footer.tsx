'use client';

import TariLogo from '../TariLogo/TariLogo';
import {
    Wrapper,
    LinksWrapper,
    Column,
    Title,
    Links,
    StyledLink,
    LogoColumn,
    Copyright,
    Holder,
    Divider,
} from './styles';

export default function Footer() {
    return (
        <Wrapper>
            <Holder>
                <LogoColumn>
                    <TariLogo width={109} />
                </LogoColumn>

                <LinksWrapper>
                    <Column>
                        <Title>Tari</Title>

                        <Links>
                            <StyledLink href="https://tari.com">Protocol</StyledLink>
                            <StyledLink href="https://tari.com">Downloads</StyledLink>
                            <StyledLink href="https://tari.com">Tokenomics</StyledLink>
                            <StyledLink href="https://tari.com">Get Involved</StyledLink>
                            <StyledLink href="https://tari.com">Airdrop Game</StyledLink>
                            <StyledLink href="https://tari.com">Community</StyledLink>

                            <Divider />

                            <StyledLink href="mailto:support@tari.com">support@tari.com</StyledLink>
                        </Links>
                    </Column>

                    <Column>
                        <Title>Build</Title>

                        <Links>
                            <StyledLink href="https://tari.com">RFC Docs</StyledLink>
                            <StyledLink href="https://tari.com">Make Tari Better</StyledLink>
                        </Links>
                    </Column>

                    <Column>
                        <Title>About</Title>

                        <Links>
                            <StyledLink href="https://tari.com">About Us</StyledLink>
                            <StyledLink href="https://tari.com">Updates</StyledLink>
                            <StyledLink href="https://tari.com">Partners</StyledLink>
                        </Links>
                    </Column>
                </LinksWrapper>

                <Copyright>© {new Date().getFullYear()} — Tari Labs All Rights Reserved</Copyright>
            </Holder>
        </Wrapper>
    );
}
