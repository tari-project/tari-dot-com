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
    TariImage,
    ContentBox,
} from './styles';
import tariImage from '../images/tari-built.png';
import Link from 'next/link';
import { useMainStore } from '@/services/stores/useMainStore';
import { AnimatePresence, motion } from 'motion/react';

export default function SuperMenu() {
    const { showSuperMenu, setShowSuperMenu } = useMainStore();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setShowSuperMenu(false);
            timeoutRef.current = null;
        }, 350);
    };

    const handleEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleLinkClick = () => {
        setShowSuperMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuperMenu(false);
            }
        };

        if (showSuperMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSuperMenu, setShowSuperMenu]);

    useEffect(() => {
        setShowSuperMenu(false);
    }, [setShowSuperMenu]);

    return (
        <AnimatePresence>
            {showSuperMenu && (
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
                        <SectionTitle>About Tari</SectionTitle>

                        <ContentHolder>
                            <Links>
                                <LinkButton as={Link} href="/tokenomics" onClick={handleLinkClick}>
                                    <LinkTitle>Tokenomics</LinkTitle>
                                    <LinkText>Explore Tari&apos;s economy</LinkText>
                                </LinkButton>

                                <LinkButton
                                    as={Link}
                                    href="https://explore-nextnet.tari.com/"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>Block Explorer</LinkTitle>
                                    <LinkText>View network activity</LinkText>
                                </LinkButton>

                                <LinkButton
                                    as={Link}
                                    href="https://github.com/tari-project"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>GitHub Repos</LinkTitle>
                                    <LinkText>Explore Tari&apos;s open-source code and projects</LinkText>
                                </LinkButton>

                                <LinkButton
                                    as={Link}
                                    href="https://store.tarilabs.com/"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>TTL Store</LinkTitle>
                                    <LinkText>Shop Tari merch with your tXTM</LinkText>
                                </LinkButton>

                                <LinkButton
                                    as={Link}
                                    href="https://tlu.tarilabs.com/"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>Tari Labs University</LinkTitle>
                                    <LinkText>Learn about blockchain and Tari technology</LinkText>
                                </LinkButton>

                                <LinkButton as={Link} href="/updates" onClick={handleLinkClick}>
                                    <LinkTitle>Dev updates</LinkTitle>
                                    <LinkText>Get the latest dev news</LinkText>
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
