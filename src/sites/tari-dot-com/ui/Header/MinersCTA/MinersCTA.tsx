'use client';

import React from 'react';
import { Button, ButtonWrapper, ConfettiTarget, Dot, NumberWrapper, Text, TextWrapper, Wrapper } from './styles';
import ArrowIcon from './ArrowIcon';
import { useReward } from 'react-rewards';
import { useCountUp } from '@/hooks/useCountUp';
import NumberFlow from '@number-flow/react';

export default function MinersCTA() {
    const count = useCountUp(37500);
    const { reward } = useReward('minsers-cta-header-reward', 'emoji', {
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
        <Wrapper>
            <TextWrapper>
                <Dot />
                <Text>
                    <NumberWrapper>
                        <NumberFlow
                            value={count}
                            format={{
                                notation: 'compact',
                                compactDisplay: 'short',
                                maximumFractionDigits: 1,
                            }}
                        />
                    </NumberWrapper>
                    active miners
                </Text>
            </TextWrapper>
            <ButtonWrapper>
                <Button onClick={reward}>
                    <span>Start Earning</span> <ArrowIcon className="arrow-icon" />
                </Button>
                <ConfettiTarget id="minsers-cta-header-reward" />
            </ButtonWrapper>
        </Wrapper>
    );
}
