'use client';

import React from 'react';
import { HoverBox, NavLink, Wrapper } from './styles';
import { AnimatePresence } from 'motion/react';
import { useMainStore } from '@/services/stores/useMainStore';

interface NavigationProps {
    theme?: 'dark' | 'light';
}

export default function Navigation({ theme = 'dark' }: NavigationProps) {
    const {
        showSuperMenu,
        setShowSuperMenu,
        showCommunityMenu,
        setShowCommunityMenu,
        showBuildMenu,
        setShowBuildMenu,
    } = useMainStore();

    const handleAboutEnter = () => {
        setShowSuperMenu(true);
        setShowCommunityMenu(false);
        setShowBuildMenu(false);
    };

    const handleBuildEnter = () => {
        setShowBuildMenu(true);
        setShowSuperMenu(false);
        setShowCommunityMenu(false);
    };

    const handleCommunityEnter = () => {
        setShowCommunityMenu(true);
        setShowSuperMenu(false);
        setShowBuildMenu(false);
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

            <NavLink onMouseEnter={handleBuildEnter} $active={showBuildMenu} $theme={theme}>
                <span>Build</span>
                <AnimatePresence>
                    {showBuildMenu && (
                        <HoverBox
                            $theme={theme}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        />
                    )}
                </AnimatePresence>
            </NavLink>

            <NavLink onMouseEnter={handleCommunityEnter} $active={showCommunityMenu} $theme={theme}>
                <span>Community</span>
                <AnimatePresence>
                    {showCommunityMenu && (
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
