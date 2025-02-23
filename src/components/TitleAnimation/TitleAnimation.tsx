import React from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'motion/react';

interface TextAnimationProps {
    text: string;
    delay?: number;
    initialDelay?: number;
    className?: string;
    color?: string;
}

const TextWrapper = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
`;

const WordWrapper = styled.span<{ $color?: string }>`
    display: inline-flex;
    align-items: center;
    font-family: var(--font-druk), sans-serif;
    font-size: 120px;
    font-weight: 800;
    font-style: normal;
    text-transform: uppercase;
    color: ${(props) => props.$color || '#fff'};
    margin-right: 16px;
    overflow: hidden;
    height: 105px;
`;

const WordAnimation = styled(motion.span)`
    display: inline-block;
`;

const wordVariants: Variants = {
    hidden: {
        y: 110,
        transition: {
            duration: 0.5,
            ease: 'anticipate',
        },
    },
    visible: {
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'anticipate',
        },
    },
};

const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: (delay: number) => ({
        transition: {
            delayChildren: delay,
            staggerChildren: 0.15,
            ease: 'easeInOut',
            staggerDirection: 1,
        },
    }),
};

export const TitleAnimation: React.FC<TextAnimationProps> = ({ text, initialDelay = 500, className, color }) => {
    const words = text.split(' ').filter((word) => word.length > 0);

    return (
        <TextWrapper
            className={className}
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            custom={initialDelay / 1000}
        >
            {words.map((word, i) => (
                <WordWrapper key={`${word}-${i}`} $color={color}>
                    <WordAnimation key={`${word}-${i}-ani`} variants={wordVariants} custom={i}>
                        {word}
                    </WordAnimation>
                </WordWrapper>
            ))}
        </TextWrapper>
    );
};

export default TitleAnimation;
