'use client';

import React, { useState } from 'react';
import { HoverBox, NavLink, Wrapper } from './styles';
import Link from 'next/link';
import { AnimatePresence } from 'motion/react';
import { useMainStore } from '@/services/stores/useMainStore';

export default function Navigation() {
    const [hovered, setHovered] = useState(0);
    const { showSuperMenu, setShowSuperMenu } = useMainStore();

    const handleAboutEnter = () => {
        setHovered(1);
        setShowSuperMenu(true);
    };

    const handleEnter = (index: number) => {
        setHovered(index);
        setShowSuperMenu(false);
    };

    const handleLeave = () => {
        setHovered(0);
    };

    return (
        <Wrapper>
            <NavLink onMouseEnter={handleAboutEnter} $active={showSuperMenu}>
                <span>About Tari</span>
                <AnimatePresence>
                    {showSuperMenu && (
                        <HoverBox
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        />
                    )}
                </AnimatePresence>
            </NavLink>

            <NavLink
                as={Link}
                href={`https://universe.tari.com/`}
                target="_blank"
                onMouseEnter={() => handleEnter(2)}
                onMouseLeave={handleLeave}
            >
                <span>Tari Universe</span>

                <AnimatePresence>
                    {hovered === 2 && (
                        <HoverBox
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
                onMouseEnter={() => handleEnter(3)}
                onMouseLeave={handleLeave}
            >
                <span>Air Drop</span>
                <AnimatePresence>
                    {hovered === 3 && (
                        <HoverBox
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
