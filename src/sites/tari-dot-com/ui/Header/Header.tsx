'use client';

import React from 'react';
import { HeaderDark } from './styles';
import Navigation from './Navigation/Navigation';
import MinersCTA from './MinersCTA/MinersCTA';
import TariLogo from '../TariLogo/TariLogo';

export default function Header() {
    const headerContent = (
        <>
            <TariLogo />
            <Navigation />
            <MinersCTA />
        </>
    );

    return (
        <>
            <HeaderDark>{headerContent}</HeaderDark>
        </>
    );
}
