'use client';

import React, { useEffect } from 'react';
import { Wrapper } from './styles';
import MinersCTA from '../MinersCTA/MinersCTA';
import { AnimatePresence } from 'motion/react';
import { useMainStore } from '@/services/stores/useMainStore';
import MobileLinks from './MobileLinks/MobileLinks';
import SocialLinks from '../../Footer/components/SocialLinks/SocialLinks';

export default function MobileMenu() {
    const { showMobileMenu, setShowMobileMenu } = useMainStore();

    useEffect(() => {
        setShowMobileMenu(false);
    }, [setShowMobileMenu]);

    useEffect(() => {
        if (showMobileMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showMobileMenu]);

    return (
        <AnimatePresence>
            {showMobileMenu && (
                <Wrapper
                    initial={{ y: '-100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ type: 'tween', duration: 0.4, ease: 'circInOut' }}
                >
                    <MobileLinks />
                    <MinersCTA theme="dark" buttonText={`Download Tari Universe`} />
                    <SocialLinks />
                </Wrapper>
            )}
        </AnimatePresence>
    );
}
