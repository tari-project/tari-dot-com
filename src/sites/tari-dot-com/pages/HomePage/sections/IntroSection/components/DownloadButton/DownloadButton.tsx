'use client';

import { useState } from 'react';
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
}

export default function DownloadButton({
    backgroundColor,
    textColor,
    showIconBackground = false,
    subTextComponent,
}: Props) {
    const [hovering, setHovering] = useState(false);

    const { setShowDownloadModal } = useUIStore();
    const { handleDownloadClick } = useDownloadUniverse();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        handleDownloadClick(e);
        setShowDownloadModal(true);
    };

    return (
        <Wrapper
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.5 }}
            $subTextComponent={!!subTextComponent}
        >
            <Button
                as={Link}
                href="/downloads"
                onClick={handleClick}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                $backgroundColor={backgroundColor}
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
        </Wrapper>
    );
}
