import React from 'react';
import { LogoImage, LogoWrapper, Wrapper } from './styles';
import TariLogo from './logos/TariLogo';
import CrossIcon from './logos/CrossIcon';
import { Exchange } from '@/sites/exchange/types/exchange';
import { isValidImage } from '@/sites/exchange/utils';

export default function HeroHeader({ exchange }: { exchange: Exchange }) {
    const isVeera = exchange.id === 'veera';
    const logoUrl = exchange?.dark_logo_img_url || exchange?.logo_img_url
    return (
        <Wrapper>
            <LogoWrapper>
                <TariLogo />
                <CrossIcon />
                {isValidImage(logoUrl) ? (
                    <LogoImage src={logoUrl} alt={exchange?.name} $isVeera={isVeera} />
                ) : (
                    <div style={{ width: 121, height: 38, background: '#444', borderRadius: 8 }} />
                )}
            </LogoWrapper>
        </Wrapper>
    );
}
