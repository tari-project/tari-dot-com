'use client';

import React from 'react';
import { DesktopOnly, HeaderDark, Wrapper } from './styles';
import Navigation from './Navigation/Navigation';
import MinersCTA from './MinersCTA/MinersCTA';
import TariLogo from '../TariLogo/TariLogo';
import MobileMenuButton from './MobileMenuButton/MobileMenuButton';
import MobileMenu from './MobileMenu/MobileMenu';

export const headerLinks = [
    { title: 'What is Tari', href: '#' },
    { title: 'Mine Tari', href: '#' },
    { title: 'Air Drop', href: 'https://airdrop.tari.com/' },
];

export default function Header() {
    return (
        <Wrapper>
            <HeaderDark>
                <TariLogo href="/" />
                <DesktopOnly>
                    <Navigation />
                    <MinersCTA theme="dark" />
                </DesktopOnly>
                <MobileMenuButton />
            </HeaderDark>
            <MobileMenu />
        </Wrapper>
    );
}
