'use client';

import React, { useRef, useEffect } from 'react';
import {
    Wrapper,
    SectionTitle,
    ContentHolder,
    LinkButton,
    LinkTitle,
    LinkText,
    ContentBox,
    TariImage,
} from '../SuperMenu/styles';
import { CommunityLinks } from './styles';
import tariImage from '../images/tari-built.png';
import Link from 'next/link';
import { useMainStore } from '@/services/stores/useMainStore';
import { AnimatePresence, motion } from 'motion/react';

export default function CommunityMenu() {
    const { showCommunityMenu, setShowCommunityMenu } = useMainStore();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setShowCommunityMenu(false);
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
        setShowCommunityMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowCommunityMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <AnimatePresence>
            {showCommunityMenu && (
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
                        <SectionTitle>Community</SectionTitle>

                        <ContentHolder>
                            <CommunityLinks>
                                <LinkButton
                                    as={Link}
                                    href="https://community.tari.com/"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>Forum</LinkTitle>
                                    <LinkText>Shape the protocol and vote on proposals</LinkText>
                                </LinkButton>

                                <LinkButton
                                    as={Link}
                                    href="https://rfc.tari.com/TIP-0002_tari_community_charter"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>Tari Community Charter</LinkTitle>
                                    <LinkText>Read the community principles and values</LinkText>
                                </LinkButton>

                                <LinkButton
                                    as={Link}
                                    href="https://rfc.tari.com/Process/TIP-PROC-0006_core_contributor_program.html"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>Core Contributor Program</LinkTitle>
                                    <LinkText>Become a core contributor to Tari</LinkText>
                                </LinkButton>

                                <LinkButton
                                    as={Link}
                                    href="https://x.com/tari"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>X (@tari)</LinkTitle>
                                    <LinkText>Follow along in real time</LinkText>
                                </LinkButton>

                                <LinkButton
                                    as={Link}
                                    href="https://discord.com/invite/tari"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>Discord</LinkTitle>
                                    <LinkText>Where the Tari community hangs out</LinkText>
                                </LinkButton>

                                <LinkButton
                                    as={Link}
                                    href="https://www.youtube.com/@taricommunity"
                                    target="_blank"
                                    onClick={handleLinkClick}
                                >
                                    <LinkTitle>YouTube</LinkTitle>
                                    <LinkText>Watch videos from the Tari community</LinkText>
                                </LinkButton>
                            </CommunityLinks>

                            <TariImage src={tariImage.src} alt="Built for tinkerers" />
                        </ContentHolder>
                    </ContentBox>
                </Wrapper>
            )}
        </AnimatePresence>
    );
}
