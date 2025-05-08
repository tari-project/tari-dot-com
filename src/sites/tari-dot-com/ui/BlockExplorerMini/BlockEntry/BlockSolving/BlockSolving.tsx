'use client';

import { BlockData } from '../BlockEntry';
import BlockTimer from './BlockTimer/BlockTimer';

import { Inside, Wrapper, BoxWrapper, ContentWrapper, Title, VideoWrapper } from './styles';
import BlockVideo from './BlockVideo/BlockVideo';
import { useState, useEffect } from 'react';
import { MetaData, RewardPill, TimeAgo } from '../BlockSolved/styles';
import { AnimatePresence } from 'motion/react';

interface Props extends BlockData {
    isSolved?: boolean;
}

export default function BlockSolving({ id }: Props) {
    const [isSolved, setIsSolved] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSolved(true);
        }, 6000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Wrapper
            layout="position"
            layoutId={id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: [0.15, 0, 0, 0.97] }}
        >
            <AnimatePresence mode="popLayout">
                {!isSolved ? (
                    <BoxWrapper
                        $isSolved={isSolved}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={`solving-${id}`}
                        transition={{ duration: 1.5, ease: [0.15, 0, 0, 0.97] }}
                    >
                        <Inside $isSolved={isSolved}>
                            <VideoWrapper>
                                <BlockVideo isSolved={isSolved} />
                            </VideoWrapper>
                            <ContentWrapper $isSolved={isSolved}>
                                <Title>
                                    <strong>#24,745</strong> block is being solved
                                </Title>
                                <BlockTimer time={`12:34`} />
                            </ContentWrapper>
                        </Inside>
                    </BoxWrapper>
                ) : (
                    <BoxWrapper
                        $isSolved={isSolved}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={`solved-${id}`}
                        transition={{ duration: 1.5, ease: [0.15, 0, 0, 0.97] }}
                    >
                        <Inside $isSolved={isSolved}>
                            <VideoWrapper>
                                <BlockVideo isSolved={isSolved} />
                            </VideoWrapper>
                            <ContentWrapper $isSolved={isSolved}>
                                <Title>
                                    <strong>28 miners</strong> got rewarded
                                </Title>
                                <MetaData>
                                    <RewardPill>447 XTM</RewardPill>
                                    <TimeAgo>12 mins ago</TimeAgo>
                                </MetaData>
                            </ContentWrapper>
                        </Inside>
                    </BoxWrapper>
                )}
            </AnimatePresence>
        </Wrapper>
    );
}
