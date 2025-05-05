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
    const [showGroupTwo, setShowGroupTwo] = useState(false);

    const handleLinkClick = () => {
        setShowMobileMenu(false);
    };

    return (
        <Wrapper $showGroupTwo={showGroupTwo}>
            <AnimatePresence mode="popLayout">
                {!showGroupTwo ? (
                    <GroupOne initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="group-one">
                        <NavLink onClick={() => setShowGroupTwo(true)}>
                            About Tari <ChevronRight />
                        </NavLink>
                        <NavLink as={Link} href={`/#how-it-works`} onClick={handleLinkClick}>
                            How it works
                        </NavLink>
                        <NavLink
                            as={Link}
                            href={`https://universe.tari.com/`}
                            target="_blank"
                            onClick={handleLinkClick}
                        >
                            Airdrop
                        </NavLink>
                    </GroupOne>
                ) : (
                    <GroupTwo initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="group-two">
                        <NavLink onClick={() => setShowGroupTwo(false)}>
                            <ChevronLeft />
                        </NavLink>

                        <NavLink as={Link} href="/tokenomics" onClick={handleLinkClick}>
                            Tokenomics
                        </NavLink>

                        <NavLink as={Link} href="https://explore.tari.com/" target="_blank" onClick={handleLinkClick}>
                            Block Explorer
                        </NavLink>

                        <NavLink
                            as={Link}
                            href="https://github.com/tari-project"
                            target="_blank"
                            onClick={handleLinkClick}
                        >
                            GitHub
                        </NavLink>

                        <NavLink as={Link} href="https://store.tarilabs.com/" target="_blank" onClick={handleLinkClick}>
                            <span>
                                Tari Genesis Store <Chip>coming soon</Chip>
                            </span>
                        </NavLink>

                        <NavLink as={Link} href="https://tlu.tarilabs.com/" target="_blank" onClick={handleLinkClick}>
                            Tari Labs University
                        </NavLink>

                        <NavLink as={Link} href="/updates" onClick={handleLinkClick}>
                            Developer Updates
                        </NavLink>
                    </GroupTwo>
                )}
            </AnimatePresence>
        </Wrapper>
    );
}
