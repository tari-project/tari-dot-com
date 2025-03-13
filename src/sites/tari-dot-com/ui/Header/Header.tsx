'use client';

import React from 'react';
import { HeaderBox, Wrapper } from './styles';
import Navigation from './Navigation/Navigation';
import MinersCTA from './MinersCTA/MinersCTA';
import TariLogo from '../TariLogo/TariLogo';
import SuperMenu from './SuperMenu/SuperMenu';
import MobileHeader from './MobileHeader/MobileHeader';

export default function Header() {
    return (
        <>
            <Wrapper>
                <HeaderBox>
                    <TariLogo href="/" />
                    <Navigation />
                    <MinersCTA theme="dark" buttonText={`Download`} hoverText={`Download Tari Universe`} />
                    <SuperMenu />
                </HeaderBox>
            </Wrapper>

            <MobileHeader />
        </>
    );
}
