'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Button, ButtonWrapper, ConfettiTarget, Dot, NumberWrapper, Text, TextWrapper, Wrapper } from './styles';
import ArrowIcon from './ArrowIcon';
import { useReward } from 'react-rewards';
import { useMinerStats } from '@/services/api/useMinerStats';

import dynamic from 'next/dynamic';
const NumberFlow = dynamic(() => import('@number-flow/react'), { ssr: false });

interface Props {
    id: string;
    theme: 'light' | 'dark';
}

export default function MinersCTA({ id, theme }: Props) {
    const { data } = useMinerStats();
    const countValue = data?.totalMiners ?? 0;
    const [numberWidth, setNumberWidth] = useState(26);
    const numberRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (numberRef.current) {
            const width = numberRef.current.offsetWidth;
            setNumberWidth(width > 0 ? width : 26);
        }
    }, [countValue]);

    const { reward } = useReward(id, 'emoji', {
        emoji: ['🤑', '💰', '💎'],
        angle: 90,
        decay: 0.91,
        spread: 60,
        startVelocity: 20,
        elementCount: 20,
        elementSize: 20,
        lifetime: 100,
    });

    return (
        <Wrapper $theme={theme}>
            <TextWrapper>
                <Dot $theme={theme} />
                <Text $theme={theme}>
                    <NumberWrapper style={{ width: `${numberWidth}px` }}>
                        <span ref={numberRef}>
                            <NumberFlow
                                value={countValue}
                                format={{
                                    notation: 'compact',
                                    compactDisplay: 'short',
                                    maximumFractionDigits: 1,
                                }}
                            />
                        </span>
                    </NumberWrapper>
                    active miners
                </Text>
            </TextWrapper>
            <ButtonWrapper>
                <Button onClick={reward} $theme={theme}>
                    <span>Start Earning</span> <ArrowIcon className="arrow-icon" />
                </Button>
                <ConfettiTarget id={id} />
            </ButtonWrapper>
        </Wrapper>
    );
}
