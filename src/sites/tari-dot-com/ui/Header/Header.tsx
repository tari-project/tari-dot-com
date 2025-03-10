'use client';

import React from 'react';
import { DesktopOnly, HeaderDark, Wrapper } from './styles';
import Navigation from './Navigation/Navigation';
import MinersCTA from './MinersCTA/MinersCTA';
import TariLogo from '../TariLogo/TariLogo';
import MobileMenuButton from './MobileMenuButton/MobileMenuButton';

export const headerLinks = [
    { title: 'How it Works', href: '/#how-it-works' },
    { title: 'Mine Tari', href: '/downloads' },
    { title: 'Air Drop', href: 'https://airdrop.tari.com/' },
];

export default function Header() {
    return (
        <Wrapper>
            <HeaderDark>
                <TariLogo href="/" />
                <DesktopOnly>
                    <Navigation />
                    <MinersCTA theme="dark" buttonText={`Download`} />
                </DesktopOnly>
                <MobileMenuButton />
            </HeaderDark>
        </Wrapper>
    );
}
