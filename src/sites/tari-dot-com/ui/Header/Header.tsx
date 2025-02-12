'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSpring, useMotionValue, useMotionTemplate, useTransform } from 'motion/react';
import { HeaderLight, HeaderDark, Wrapper } from './styles';

interface HeaderProps {
    containerRef?: React.RefObject<HTMLDivElement | null>;
    darkBgRef?: React.RefObject<HTMLDivElement | null>;
    tariSectionRef?: React.RefObject<HTMLDivElement | null>;
}

function boxesOverlap(a: DOMRect, b: DOMRect) {
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

export default function Header({ darkBgRef, tariSectionRef }: HeaderProps) {
    const headerRef = useRef<HTMLDivElement>(null);
    const [isDarkBgIntersecting, setIsDarkBgIntersecting] = useState(false);
    const [isTariIntersecting, setIsTariIntersecting] = useState(false);

    useEffect(() => {
        function checkOverlap() {
            if (!headerRef.current) return;
            const headerRect = headerRef.current.getBoundingClientRect();

            if (darkBgRef?.current) {
                const darkBgRect = darkBgRef.current.getBoundingClientRect();
                setIsDarkBgIntersecting(boxesOverlap(headerRect, darkBgRect));
            }

            if (tariSectionRef?.current) {
                const tariRect = tariSectionRef.current.getBoundingClientRect();
                setIsTariIntersecting(boxesOverlap(headerRect, tariRect));
            }
        }

        // Check on mount and on scroll
        checkOverlap();
        window.addEventListener('scroll', checkOverlap, { passive: true });
        window.addEventListener('resize', checkOverlap);

        return () => {
            window.removeEventListener('scroll', checkOverlap);
            window.removeEventListener('resize', checkOverlap);
        };
    }, [darkBgRef, tariSectionRef]);

    const boundaryValue = useMotionValue(100);

    useEffect(() => {
        const shouldShowDark = isDarkBgIntersecting && !isTariIntersecting;
        boundaryValue.set(shouldShowDark ? 0 : 100);
    }, [isDarkBgIntersecting, isTariIntersecting]);

    const clipBoundary = useSpring(boundaryValue, {
        stiffness: 100,
        damping: 30,
        mass: 0.5,
    });

    const boundaryString = useTransform(clipBoundary, (val) => `${val}%`);

    const headerLightClipPath = useMotionTemplate`inset(0 0 0 0)`;
    const headerDarkClipPath = useMotionTemplate`inset(${boundaryString} 0 0 0)`;

    return (
        <Wrapper ref={headerRef}>
            <HeaderLight style={{ clipPath: headerLightClipPath }}>Header</HeaderLight>
            <HeaderDark style={{ clipPath: headerDarkClipPath }}>Header</HeaderDark>
        </Wrapper>
    );
}
