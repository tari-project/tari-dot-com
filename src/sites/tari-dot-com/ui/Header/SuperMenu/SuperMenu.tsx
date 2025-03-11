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
        }, 500);
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onMouseLeave={handleLeave}
                    onMouseEnter={handleEnter}
                >
                    <ContentBox>
                        <SectionTitle>About Tari</SectionTitle>

                        <ContentHolder>
                            <Links>
                                <LinkButton as={Link} href="#">
                                    <LinkTitle>Tokenomics</LinkTitle>
                                    <LinkText>Learn about Tari tokenomics</LinkText>
                                </LinkButton>

                                <LinkButton as={Link} href="#">
                                    <LinkTitle>GitHub Repos</LinkTitle>
                                    <LinkText>Learn about Tari tokenomics</LinkText>
                                </LinkButton>

                                <LinkButton as={Link} href="#">
                                    <LinkTitle>Tari Labs University</LinkTitle>
                                    <LinkText>Learn about Tari tokenomics</LinkText>
                                </LinkButton>

                                <LinkButton as={Link} href="#">
                                    <LinkTitle>Block Explorer</LinkTitle>
                                    <LinkText>Learn about Tari tokenomics</LinkText>
                                </LinkButton>

                                <LinkButton as={Link} href="#">
                                    <LinkTitle>TTL Store</LinkTitle>
                                    <LinkText>Learn about Tari tokenomics</LinkText>
                                </LinkButton>

                                <LinkButton as={Link} href="#">
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
