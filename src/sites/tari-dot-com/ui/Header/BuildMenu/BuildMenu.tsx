'use client';

import React, { useRef, useEffect } from 'react';
import {
    Wrapper,
    SectionTitle,
    ContentHolder,
    Links,
    LinkButton,
    LinkTitle,
    LinkText,
    ContentBox,
    TariImage,
    Chip,
} from '../SuperMenu/styles';
import tariImage from '../images/tari-built.png';
import Link from 'next/link';
import { useMainStore } from '@/services/stores/useMainStore';
import { AnimatePresence, motion } from 'motion/react';

export default function BuildMenu() {
    const { showBuildMenu, setShowBuildMenu } = useMainStore();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setShowBuildMenu(false);
            timeoutRef.current = null;
        }, 250);
    };

    const handleEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleLinkClick = () => {
        setShowBuildMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowBuildMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <AnimatePresence>
            {showBuildMenu && (
                <Wrapper
                    ref={wrapperRef}
                    as={motion.div}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                    onMouseLeave={handleLeave}
                    onMouseEnter={handleEnter}
                >
                    <ContentBox>
                        <SectionTitle>Build</SectionTitle>

                        <ContentHolder>
                            <Links>
                                <LinkButton
                                    as={Link}
                                    href="https://ootle.tari.com/"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>
                                        Build on Ootle <Chip>testnet</Chip>
                                    </LinkTitle>
                                    <LinkText>Explore the docs and start building applications.</LinkText>
                                </LinkButton>

                                <LinkButton
                                    as={Link}
                                    href="https://ootle.tari.com/community-templates"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>Explore Tari Templates</LinkTitle>
                                    <LinkText>Discover templates built by the Tari community.</LinkText>
                                </LinkButton>

                                <LinkButton
                                    as={Link}
                                    href="https://github.com/tari-project"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>GitHub</LinkTitle>
                                    <LinkText>Explore Tari&apos;s codebase (it&apos;s open source!)</LinkText>
                                </LinkButton>

                                <LinkButton as={Link} href="/integration-guide" onClick={handleLinkClick}>
                                    <LinkTitle>Exchange Integration Guide</LinkTitle>
                                    <LinkText>Integrate Tari (XTM) into your exchange</LinkText>
                                </LinkButton>

                                <LinkButton
                                    as={Link}
                                    href="https://github.com/tari-project/bounties"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>Developer Bounties</LinkTitle>
                                    <LinkText>Pick an issue, ship code and earn XTM</LinkText>
                                </LinkButton>

                                <LinkButton
                                    as={Link}
                                    href="https://rfc.tari.com/"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>Protocol Docs</LinkTitle>
                                    <LinkText>Read the Tari protocol RFCs and docs</LinkText>
                                </LinkButton>
                            </Links>

                            <TariImage src={tariImage.src} alt="Built for tinkerers" />
                        </ContentHolder>
                    </ContentBox>
                </Wrapper>
            )}
        </AnimatePresence>
    );
}
