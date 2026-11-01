'use client';

import React, { useEffect } from 'react';
import { HeaderTop, Inside, Menu, MenuHolder, SocialLinks, Wrapper } from './styles';
import TariLogo from '../../TariLogo/TariLogo';
import MobileMenuButton from '../MobileMenuButton/MobileMenuButton';
import { useMainStore } from '@/services/stores/useMainStore';
import MinersCTA from '../MinersCTA/MinersCTA';
import { SocialIconButtons } from '../../Footer/components/SocialLinks/SocialLinks';
import MobileNavigation from './MobileNavigation/MobileNavigation';
import ActiveNodes from '../ActiveNodes/ActiveNodes';
import { useHeaderVariant } from '@/sites/tari-dot-com/ui/Header/hooks';

export default function MobileHeader() {
    const { showMobileMenu, setShowMobileMenu } = useMainStore();
    const variant = useHeaderVariant();

    useEffect(() => {
        if (showMobileMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showMobileMenu]);

    useEffect(() => {
        setShowMobileMenu(false);
    }, [setShowMobileMenu]);

    const handleLinkClick = () => {
        setShowMobileMenu(false);
    };

    return (
        <>
            <Wrapper $open={showMobileMenu}>
                <Inside>
                    <HeaderTop $open={showMobileMenu}>
                        <TariLogo href="/" onClick={handleLinkClick} />
                        {showMobileMenu ? null : <ActiveNodes theme="dark" variant={variant} />}
                        <MobileMenuButton />
                    </HeaderTop>
                </Inside>
            </Wrapper>
            {showMobileMenu && (
                <Menu>
                    <MenuHolder>
                        <MobileNavigation />
                        <MinersCTA theme="dark" buttonText={`Download`} />
                        <SocialLinks>
                            <SocialIconButtons />
                        </SocialLinks>
                    </MenuHolder>
                </Menu>
            )}
        </>
    );
}
