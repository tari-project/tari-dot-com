'use client';

import { useState } from 'react';
import AppleIcon from './icons/AppleIcon';
import LinuxIcon from './icons/LinuxIcon';
import WindowsIcon from './icons/WindowsIcon';
import { Button, HoverGradient, Icons, Text, Word, Wrapper } from './styles';
import { AnimatePresence } from 'motion/react';
import { useDownloadUniverse } from '@/services/api/useDownloadUniverse';
import Link from 'next/link';

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
}

export default function DownloadButton({ backgroundColor, textColor, showIconBackground = false }: Props) {
    const [hovering, setHovering] = useState(false);

    const { handleDownloadClick } = useDownloadUniverse();

    return (
        <Wrapper
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.5 }}
        >
            <Button
                as={Link}
                href="/downloads"
                onClick={handleDownloadClick}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                $backgroundColor={backgroundColor}
            >
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
                        <Text key="hover" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                            <Word variants={wordVariants}>Start</Word> <Word variants={wordVariants}>Earning</Word>{' '}
                            <Word variants={wordVariants}>XTM</Word> <Word variants={wordVariants}>Today</Word>
                        </Text>
                    )}
                </AnimatePresence>
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
        </Wrapper>
    );
}
