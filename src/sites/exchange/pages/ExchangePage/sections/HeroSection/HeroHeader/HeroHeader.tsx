import React from 'react';
import { LeftSide, LogoImage, LogoWrapper, RightSide, Wrapper } from './styles';
import MinersCTA from '@/sites/tari-dot-com/ui/Header/MinersCTA/MinersCTA';
import TariLogo from './logos/TariLogo';
import CrossIcon from './logos/CrossIcon';
import { Exchange } from '@/sites/exchange/types/exchange';
import WhatIsTariButton from './WhatIsTariButton';

export default function HeroHeader({ exchange }: { exchange: Exchange }) {
    return (
        <Wrapper>
            <LeftSide>
                <WhatIsTariButton />
            </LeftSide>

            <LogoWrapper>
                <TariLogo />
                <CrossIcon />
                <LogoImage src={exchange?.logo_img_url} alt="" />
            </LogoWrapper>

            <RightSide>
                <MinersCTA theme={`dark`} buttonText={`Start Mining`} />
            </RightSide>
        </Wrapper>
    );
}
