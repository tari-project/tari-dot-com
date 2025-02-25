import React from 'react';
import { Variants, useInView } from 'motion/react';
import { Space, WordAnimation, WordSpacer, WordWrapper, Wrapper } from './styles';

interface Props {
    text: string;
    delay?: number;
    initialDelay?: number;
    className?: string;
    color?: string;
    align?: 'left' | 'center' | 'right';
    staggerDelay?: number;
}

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
    visible: ({ delay, staggerDelay }) => ({
        transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
            ease: 'easeInOut',
            staggerDirection: 1,
        },
    }),
};

export const TitleAnimation: React.FC<Props> = ({ text, initialDelay = 200, align = 'left', staggerDelay = 0.15 }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    const words = text.split(/(\s+)/).filter((segment) => segment.length > 0);

    return (
        <Wrapper
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={{ delay: initialDelay / 1000, staggerDelay }}
            $align={align}
        >
            {words.map((segment, i) =>
                segment.trim().length === 0 ? (
                    <Space key={`space-${i}`}>&nbsp;</Space>
                ) : (
                    <WordWrapper key={`word-${i}`}>
                        <WordAnimation variants={wordVariants} custom={i}>
                            {segment}
                        </WordAnimation>
                        <WordSpacer>{segment}</WordSpacer>
                    </WordWrapper>
                )
            )}
        </Wrapper>
    );
};

export default TitleAnimation;
