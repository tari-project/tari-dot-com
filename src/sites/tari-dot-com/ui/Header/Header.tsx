'use client';

import React from 'react';
import { HeaderDark, Wrapper } from './styles';
import Navigation from './Navigation/Navigation';
import MinersCTA from './MinersCTA/MinersCTA';
import TariLogo from '../TariLogo/TariLogo';

export default function Header() {
    return (
        <Wrapper>
            <HeaderDark>
                <TariLogo />
                <Navigation />
                <MinersCTA />
            </HeaderDark>
        </Wrapper>
    );
}
