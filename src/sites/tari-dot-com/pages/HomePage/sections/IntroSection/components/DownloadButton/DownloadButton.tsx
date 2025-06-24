'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AppleIcon from './icons/AppleIcon';
import LinuxIcon from './icons/LinuxIcon';
import WindowsIcon from './icons/WindowsIcon';
import { Button, HoverGradient, Icons, Text, TextGroup, Word, Wrapper } from './styles';
import { AnimatePresence } from 'motion/react';
import { useDownloadUniverse } from '@/services/api/useDownloadUniverse';
import Link from 'next/link';
import { useUIStore } from '@/stores/useUiStore';

const containerVariants = {
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
    exit: {
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const wordVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: 'circInOut' },
    },
    exit: {
        y: 15,
        opacity: 0,
        transition: { duration: 0.5, ease: 'circInOut' },
    },
};

interface Props {
    backgroundColor?: string;
    textColor?: string;
    showIconBackground?: boolean;
    subTextComponent?: React.ReactNode;
    glow?: boolean;
    isVeera?: boolean;
    isSticky?: boolean;
}

export default function DownloadButton({
    backgroundColor,
    textColor,
    subTextComponent,
    showIconBackground = false,
    glow = false,
    isVeera = false,
    isSticky = false,
}: Props) {
    const [hovering, setHovering] = useState(false);
    const [isOutOfView, setIsOutOfView] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const { setShowDownloadModal } = useUIStore();
    const { handleDownloadClick } = useDownloadUniverse();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        handleDownloadClick(e);
        setShowDownloadModal(true);
    };

    console.log({ isOutOfView });

    // Intersection Observer to detect if button is out of view
    useEffect(() => {
        if (!isSticky) return;
        const ref = buttonRef.current;
        if (!ref) return;

        const observer = new window.IntersectionObserver(
            ([entry]) => {
                setIsOutOfView(!entry.isIntersecting);
            },
            { threshold: 0.01 }
        );
        observer.observe(ref);

        return () => {
            observer.disconnect();
        };
    }, [isSticky]);

    // Button JSX for reuse
    const ButtonContent = (
        <Button
            as={Link}
            href="/downloads"
            onClick={handleClick}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            $backgroundColor={backgroundColor}
            $glow={glow}
        >
            <TextGroup>
                <AnimatePresence mode="popLayout">
                    {!hovering && (
                        <Text
                            key="default"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            $textColor={textColor}
                        >
                            <Word variants={wordVariants}>Download</Word> <Word variants={wordVariants}>Tari</Word>{' '}
                            <Word variants={wordVariants}>Universe</Word>
                        </Text>
                    )}
                    {hovering && (
                        <Text
                            key="hover"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <Word variants={wordVariants}>Start</Word> <Word variants={wordVariants}>Earning</Word>{' '}
                            <Word variants={wordVariants}>XTM</Word> <Word variants={wordVariants}>Today</Word>
                        </Text>
                    )}
                </AnimatePresence>
                {subTextComponent && subTextComponent}
            </TextGroup>
            <Icons $showIconBackground={showIconBackground}>
                <WindowsIcon />
                <AppleIcon />
                <LinuxIcon />
            </Icons>
            <AnimatePresence>
                {hovering && (
                    <HoverGradient
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                    />
                )}
            </AnimatePresence>
        </Button>
    );

    return (
        <>
            <Wrapper
                key='wrapper'
                ref={isSticky ? buttonRef : undefined}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.5 }}
                $subTextComponent={!!subTextComponent}
                $isVera={isVeera}
            >
                {ButtonContent}
            </Wrapper>
            {isSticky && isOutOfView && typeof window !== 'undefined' &&
                createPortal(
                    <Wrapper
                        key='sticky-wrapper'
                        style={{
                            position: 'fixed',
                            left: 0,
                            right: 0,
                            bottom: 20,
                            zIndex: 9000,
                            margin: '0 auto',
                            maxWidth: 380,
                            width: '100%',
                            pointerEvents: 'auto',
                        }}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        $subTextComponent={!!subTextComponent}
                        $isVera={isVeera}
                    >
                        {ButtonContent}
                    </Wrapper>,
                    document.body
                )
            }
        </>
    );
}
