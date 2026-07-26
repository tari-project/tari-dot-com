'use client';

import React, { useState } from 'react';
import { Chip, GroupOne, GroupTwo, NavLink, Wrapper } from './styles';
import Link from 'next/link';
import { AnimatePresence } from 'motion/react';
import { useMainStore } from '@/services/stores/useMainStore';

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
        <path d="M1 1L8 8L1 15" stroke="white" strokeWidth="2" />
    </svg>
);

const ChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
        <path d="M9 1.59229L2 8.59228L9 15.5923" stroke="white" strokeWidth="2" />
    </svg>
);

export default function MobileNavigation() {
    const { setShowMobileMenu } = useMainStore();
    const [activeGroup, setActiveGroup] = useState<'main' | 'about' | 'community' | 'build'>('main');

    const handleLinkClick = () => {
        setShowMobileMenu(false);
    };

    return (
        <Wrapper $activeGroup={activeGroup}>
            <AnimatePresence mode="popLayout">
                {activeGroup === 'main' && (
                    <GroupOne initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="group-one">
                        <NavLink onClick={() => setActiveGroup('about')}>
                            About Tari <ChevronRight />
                        </NavLink>
                        <NavLink onClick={() => setActiveGroup('build')}>
                            Build <ChevronRight />
                        </NavLink>
                        <NavLink onClick={() => setActiveGroup('community')}>
                            Community <ChevronRight />
                        </NavLink>
                    </GroupOne>
                )}

                {activeGroup === 'about' && (
                    <GroupTwo initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="group-two">
                        <NavLink onClick={() => setActiveGroup('main')}>
                            <ChevronLeft />
                        </NavLink>

                        <NavLink as={Link} href="/tokenomics" onClick={handleLinkClick}>
                            Tokenomics
                        </NavLink>

                        <NavLink as={Link} href="https://explore.tari.com/" target="_blank" onClick={handleLinkClick}>
                            Block Explorer
                        </NavLink>

                        <NavLink as={Link} href="https://tlu.tarilabs.com/" target="_blank" onClick={handleLinkClick}>
                            Tari Labs University
                        </NavLink>

                        <NavLink as={Link} href="/branding/brandkit.zip" target="_blank" onClick={handleLinkClick}>
                            Brand Guidelines
                        </NavLink>

                        <NavLink as={Link} href="/downloads" onClick={handleLinkClick}>
                            Downloads
                        </NavLink>
                    </GroupTwo>
                )}

                {activeGroup === 'community' && (
                    <GroupTwo
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key="group-community"
                    >
                        <NavLink onClick={() => setActiveGroup('main')}>
                            <ChevronLeft />
                        </NavLink>

                        <NavLink
                            as={Link}
                            href="https://community.tari.com/"
                            target="_blank"
                            onClick={handleLinkClick}
                        >
                            Forum
                        </NavLink>

                        <NavLink
                            as={Link}
                            href="https://rfc.tari.com/TIP-0002_tari_community_charter"
                            target="_blank"
                            onClick={handleLinkClick}
                        >
                            Tari Community Charter
                        </NavLink>

                        <NavLink
                            as={Link}
                            href="https://rfc.tari.com/Process/TIP-PROC-0006_core_contributor_program.html"
                            target="_blank"
                            onClick={handleLinkClick}
                        >
                            Core Contributor Program
                        </NavLink>

                        <NavLink
                            as={Link}
                            href="https://discord.com/invite/tari"
                            target="_blank"
                            onClick={handleLinkClick}
                        >
                            Discord
                        </NavLink>

                        <NavLink as={Link} href="https://x.com/tari" target="_blank" onClick={handleLinkClick}>
                            X (@tari)
                        </NavLink>

                        <NavLink
                            as={Link}
                            href="https://www.reddit.com/r/tari/"
                            target="_blank"
                            onClick={handleLinkClick}
                        >
                            Reddit
                        </NavLink>

                        <NavLink
                            as={Link}
                            href="https://www.youtube.com/@taricommunity"
                            target="_blank"
                            onClick={handleLinkClick}
                        >
                            YouTube
                        </NavLink>
                    </GroupTwo>
                )}

                {activeGroup === 'build' && (
                    <GroupTwo initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="group-build">
                        <NavLink onClick={() => setActiveGroup('main')}>
                            <ChevronLeft />
                        </NavLink>

                        <NavLink as={Link} href="https://ootle.tari.com/" target="_blank" onClick={handleLinkClick}>
                            <span>
                                Build on Ootle <Chip>testnet</Chip>
                            </span>
                        </NavLink>

                        <NavLink
                            as={Link}
                            href="https://github.com/tari-project"
                            target="_blank"
                            onClick={handleLinkClick}
                        >
                            GitHub
                        </NavLink>

                        <NavLink
                            as={Link}
                            href="https://github.com/tari-project/bounties"
                            target="_blank"
                            onClick={handleLinkClick}
                        >
                            Developer Bounties
                        </NavLink>

                        <NavLink
                            as={Link}
                            href="https://ootle.tari.com/community-templates"
                            target="_blank"
                            onClick={handleLinkClick}
                        >
                            Explore Tari Templates
                        </NavLink>

                        <NavLink as={Link} href="/integration-guide" onClick={handleLinkClick}>
                            Exchange Integration Guide
                        </NavLink>

                        <NavLink as={Link} href="https://rfc.tari.com/" target="_blank" onClick={handleLinkClick}>
                            Protocol Docs
                        </NavLink>
                    </GroupTwo>
                )}
            </AnimatePresence>
        </Wrapper>
    );
}
