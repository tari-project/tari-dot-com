'use client';

import { useState, useEffect, useRef } from 'react';
import { Variants } from 'motion/react';
import { LetterAnimation, LetterWrapper, LetterSpacer, ContentContainer, Wrapper, Pill } from './styles';

const words = ['creators', 'builders', 'everyone'];

const EXIT_ANIMATION_DURATION = 600;
const ENTRANCE_ANIMATION_DURATION = 600;
const WORD_DISPLAY_DURATION = 2500;
const TRANSITION_GAP = 100;
const INITIAL_WORD_DISPLAY_DURATION = 2000;

const letterVariants: Variants = {
    hidden: {
        y: -30,
        opacity: 0,
        transition: {
            duration: 0.6,
            ease: 'anticipate',
        },
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: 'anticipate',
        },
    },
    exit: {
        y: 30,
        opacity: 0,
        transition: {
            duration: 0.6,
            ease: 'anticipate',
        },
    },
};

const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
        transition: {
            staggerChildren: 0.05,
            ease: 'easeInOut',
        },
    },
    exit: {
        transition: {
            staggerChildren: 0.05,
            ease: 'easeInOut',
            staggerDirection: -1,
        },
    },
};

export default function TextPill() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [wordWidths, setWordWidths] = useState<Record<string, number>>({});
    const ref = useRef(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        const tempDiv = document.createElement('div');
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.position = 'absolute';
        tempDiv.style.fontSize = '18px';
        tempDiv.style.fontWeight = '500';
        tempDiv.style.whiteSpace = 'nowrap';
        document.body.appendChild(tempDiv);

        const widths: Record<string, number> = {};
        words.forEach((word) => {
            tempDiv.textContent = word;
            widths[word] = tempDiv.clientWidth + 40;
        });

        document.body.removeChild(tempDiv);
        setWordWidths(widths);
    }, []);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        const cycleWord = () => {
            setIsExiting(true);
            setIsAnimating(true);

            animationTimeoutRef.current = setTimeout(() => {
                setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
                setIsExiting(false);

                animationTimeoutRef.current = setTimeout(() => {
                    setIsAnimating(false);
                }, TRANSITION_GAP);
            }, EXIT_ANIMATION_DURATION);
        };

        const initialTimeout = setTimeout(() => {
            cycleWord();

            animationTimeoutRef.current = setTimeout(() => {
                intervalRef.current = setInterval(
                    cycleWord,
                    WORD_DISPLAY_DURATION + EXIT_ANIMATION_DURATION + ENTRANCE_ANIMATION_DURATION + TRANSITION_GAP
                );
            }, EXIT_ANIMATION_DURATION + ENTRANCE_ANIMATION_DURATION + TRANSITION_GAP);
        }, INITIAL_WORD_DISPLAY_DURATION);

        return () => {
            clearTimeout(initialTimeout);
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
        };
    }, []);

    const currentWord = words[currentWordIndex];
    const letters = currentWord.split('');
    const currentWidth = wordWidths[currentWord] || 0;

    return (
        <Wrapper
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
        >
            <Pill
                ref={ref}
                animate={{
                    width: currentWidth ? currentWidth : 'auto',
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                }}
            >
                <ContentContainer
                    variants={containerVariants}
                    initial="hidden"
                    animate={isExiting ? 'exit' : isAnimating ? 'hidden' : 'visible'}
                    ref={contentRef}
                >
                    {letters.map((letter, i) => (
                        <LetterWrapper key={`letter-${i}-${currentWordIndex}`}>
                            <LetterAnimation variants={letterVariants}>{letter}</LetterAnimation>
                            <LetterSpacer>{letter}</LetterSpacer>
                        </LetterWrapper>
                    ))}
                </ContentContainer>
            </Pill>
        </Wrapper>
    );
}
