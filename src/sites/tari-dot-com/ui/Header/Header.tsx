'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useScroll } from 'motion/react';
import { HeaderDark, HeaderLight, Holder, Wrapper } from './styles';
import Navigation from './Navigation/Navigation';
import MinersCTA from './MinersCTA/MinersCTA';
import TariLogo from '../TariLogo/TariLogo';
import SuperMenu from './SuperMenu/SuperMenu';
import MobileHeader from './MobileHeader/MobileHeader';

export default function Header() {
    const { scrollY } = useScroll();
    const [isLightTheme, setIsLightTheme] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const hasScrolled = useRef(false);

    useEffect(() => {
        const updateScrollState = (latest: number) => {
            const triggerPoint = 940;

            if (latest > triggerPoint && !isLightTheme) {
                hasScrolled.current = true;
                setIsLightTheme(true);
            } else if (latest <= triggerPoint && isLightTheme) {
                setIsLightTheme(false);
            }

            if (hasScrolled.current && latest > 200) {
                setIsInitialRender(false);
            }
        };

        const unsubscribe = scrollY.on('change', updateScrollState);
        return () => unsubscribe();
    }, [scrollY, isLightTheme]);

    const renderHeaderContent = (theme: 'dark' | 'light') => (
        <>
            <TariLogo href="/" />
            <Navigation theme={theme} />
            <MinersCTA theme={theme} buttonText={`Download`} hoverText={`Download Tari Universe`} />
        </>
    );

    return (
        <>
            <Wrapper>
                <Holder>
                    <HeaderDark $isLightTheme={isLightTheme} $isInitialRender={isInitialRender}>
                        {renderHeaderContent('dark')}
                    </HeaderDark>
                    <HeaderLight $isLightTheme={isLightTheme} $isInitialRender={isInitialRender}>
                        {renderHeaderContent('light')}
                    </HeaderLight>
                    <SuperMenu />
                </Holder>
            </Wrapper>

            <MobileHeader />
        </>
    );
}
