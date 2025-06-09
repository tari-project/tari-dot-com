import React from 'react';
import { LogoImage, LogoWrapper, Wrapper } from './styles';
import TariLogo from './logos/TariLogo';
import CrossIcon from './logos/CrossIcon';
import { Exchange } from '@/sites/exchange/types/exchange';
import { isValidImage } from '@/sites/exchange/utils';

export default function HeroHeader({ exchange }: { exchange: Exchange }) {
    return (
        <Wrapper>
            <LogoWrapper>
                <TariLogo />
                <CrossIcon />
                {isValidImage(exchange?.logo_img_url) ? (
                    <LogoImage src={exchange.logo_img_url} alt={exchange?.name} />
                ) : (
                    <div style={{ width: 121, height: 38, background: '#444', borderRadius: 8 }} />
                )}
            </LogoWrapper>
        </Wrapper>
    );
}
