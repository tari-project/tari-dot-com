'use client';

import React from 'react';
import { NavLink, Wrapper } from './styles';

export default function Navigation() {
    return (
        <Wrapper>
            <NavLink href="/what-is-tari">What is Tari</NavLink>
            <NavLink href="/mine-tari">Mine Tari</NavLink>
            <NavLink href="/airdrop">Air Drop</NavLink>
        </Wrapper>
    );
}
