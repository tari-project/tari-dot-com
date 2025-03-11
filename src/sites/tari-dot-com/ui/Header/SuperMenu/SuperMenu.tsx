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
                                <LinkButton as={Link} href="/tokenomics">
                                    <LinkTitle>Tokenomics</LinkTitle>
                                    <LinkText>Learn about Tari tokenomics</LinkText>
                                </LinkButton>

                                <LinkButton as={Link} href="https://github.com/tari-project" target="_blank">
                                    <LinkTitle>GitHub Repos</LinkTitle>
                                    <LinkText>Learn about Tari tokenomics</LinkText>
                                </LinkButton>

                                <LinkButton as={Link} href="https://tlu.tarilabs.com/" target="_blank">
                                    <LinkTitle>Tari Labs University</LinkTitle>
                                    <LinkText>Learn about Tari tokenomics</LinkText>
                                </LinkButton>

                                <LinkButton as={Link} href="https://explore-nextnet.tari.com/" target="_blank">
                                    <LinkTitle>Block Explorer</LinkTitle>
                                    <LinkText>Learn about Tari tokenomics</LinkText>
                                </LinkButton>

                                <LinkButton as={Link} href="https://store.tarilabs.com/" target="_blank">
                                    <LinkTitle>TTL Store</LinkTitle>
                                    <LinkText>Learn about Tari tokenomics</LinkText>
                                </LinkButton>

                                <LinkButton as={Link} href="/updates">
                                    <LinkTitle>Dev updates</LinkTitle>
                                    <LinkText>Learn about Tari tokenomics</LinkText>
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
