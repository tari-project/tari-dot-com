'use client';

import React, { useState } from 'react';
import { HoverBox, NavLink, Wrapper } from './styles';
import Link from 'next/link';
import { AnimatePresence } from 'motion/react';
import { useMainStore } from '@/services/stores/useMainStore';

interface NavigationProps {
    theme?: 'dark' | 'light';
}

export default function Navigation({ theme = 'dark' }: NavigationProps) {
    const [hoveredLink, setHoveredLink] = useState<number | null>(null);
    const { showSuperMenu, setShowSuperMenu } = useMainStore();

    const handleAboutEnter = () => {
        setHoveredLink(1);
        setShowSuperMenu(true);
    };

    const handleMouseEnter = (index: number) => {
        setHoveredLink(index);
        setShowSuperMenu(false);
    };

    const handleMouseLeave = () => {
        setHoveredLink(null);
    };

    return (
        <Wrapper>
            <NavLink onMouseEnter={handleAboutEnter} $active={showSuperMenu} $theme={theme}>
                <span>About Tari</span>
                <AnimatePresence>
                    {showSuperMenu && (
                        <HoverBox
                            $theme={theme}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        />
                    )}
                </AnimatePresence>
            </NavLink>

            <NavLink
                as={Link}
                href={`https://airdrop.tari.com/`}
                target="_blank"
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
                $theme={theme}
            >
                <span>Airdrop</span>
                <AnimatePresence>
                    {hoveredLink === 3 && (
                        <HoverBox
                            $theme={theme}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        />
                    )}
                </AnimatePresence>
            </NavLink>
        </Wrapper>
    );
}
