import React from 'react';
import { LeftSide, LogoImage, LogoWrapper, RightSide, Wrapper } from './styles';
import MinersCTA from '@/sites/tari-dot-com/ui/Header/MinersCTA/MinersCTA';
import TariLogo from './logos/TariLogo';
import CrossIcon from './logos/CrossIcon';
import { Exchange } from '@/sites/exchange/types/exchange';
import WhatIsTariButton from './WhatIsTariButton';
import { isValidImage } from '@/sites/exchange/utils';

export default function HeroHeader({ exchange }: { exchange: Exchange }) {
    return (
        <Wrapper>
            <LeftSide>
                <WhatIsTariButton />
            </LeftSide>

            <LogoWrapper>
                <TariLogo />
                <CrossIcon />
                {isValidImage(exchange?.logo_img_url) ? (
                    <LogoImage src={exchange.logo_img_url} alt={exchange?.name} />
                ) : (
                    <div style={{ width: 121, height: 38, background: '#444', borderRadius: 8 }} />
                )}
            </LogoWrapper>

            <RightSide>
                <MinersCTA theme={`dark`} buttonText={`Start Mining`} />
            </RightSide>
        </Wrapper>
    );
}
