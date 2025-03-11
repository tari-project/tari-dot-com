'use client';

import React from 'react';
import { DesktopOnly, HeaderDark, Wrapper } from './styles';
import Navigation from './Navigation/Navigation';
import MinersCTA from './MinersCTA/MinersCTA';
import TariLogo from '../TariLogo/TariLogo';
import MobileMenuButton from './MobileMenuButton/MobileMenuButton';
import SuperMenu from './SuperMenu/SuperMenu';

export default function Header() {
    return (
        <Wrapper>
            <HeaderDark>
                <TariLogo href="/" />
                <DesktopOnly>
                    <Navigation />
                    <MinersCTA theme="dark" buttonText={`Download`} hoverText={`Download Tari Universe`} />
                </DesktopOnly>
                <MobileMenuButton />
                <SuperMenu />
            </HeaderDark>
        </Wrapper>
    );
}
