import React from 'react';
import { LeftSide, LogoWrapper, OutlineButton, RightSide, Wrapper } from './styles';
import MinersCTA from '@/sites/tari-dot-com/ui/Header/MinersCTA/MinersCTA';
import TariLogo from './logos/TariLogo';
import CrossIcon from './logos/CrossIcon';

export default function HeroHeader() {
    return (
        <Wrapper>
            <LeftSide>
                <OutlineButton>What is Tari?</OutlineButton>
            </LeftSide>

            <LogoWrapper>
                <TariLogo />
                <CrossIcon />
                <TariLogo />
            </LogoWrapper>

            <RightSide>
                <MinersCTA theme={`dark`} buttonText={`Start Mining`} />
            </RightSide>
        </Wrapper>
    );
}
