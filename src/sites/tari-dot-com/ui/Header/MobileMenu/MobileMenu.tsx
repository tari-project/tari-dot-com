'use client';

import React, { useState } from 'react';
import { MenuTrigger, MenuWrapper, Wrapper } from './styles';
import MenuIcon from './MenuIcon';
import Navigation from '../Navigation/Navigation';

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Wrapper>
            <MenuTrigger onClick={() => setIsOpen(!isOpen)}>
                <MenuIcon />
            </MenuTrigger>

            {isOpen && (
                <MenuWrapper>
                    <Navigation />
                </MenuWrapper>
            )}
        </Wrapper>
    );
}
