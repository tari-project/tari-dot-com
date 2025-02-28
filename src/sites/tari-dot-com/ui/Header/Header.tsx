'use client';

import React from 'react';
import { HeaderDark, Wrapper } from './styles';
import Navigation from './Navigation/Navigation';
import MinersCTA from './MinersCTA/MinersCTA';
import TariLogo from '../TariLogo/TariLogo';
import MobileMenu from './MobileMenu/MobileMenu';

export default function Header() {
    return (
        <Wrapper>
            <HeaderDark>
                <TariLogo href="/" />
                <Navigation />
                <MinersCTA theme="dark" id="minsers-cta-header-reward" />
                <MobileMenu />
            </HeaderDark>
        </Wrapper>
    );
}
