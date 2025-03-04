'use client';

import React from 'react';
import { NavLink, Wrapper } from './styles';

export default function Navigation() {
    return (
        <Wrapper>
            <NavLink href="#">What is Tari</NavLink>
            <NavLink href="#">Mine Tari</NavLink>
            <NavLink href="https://airdrop.tari.com/">Air Drop</NavLink>
        </Wrapper>
    );
}
