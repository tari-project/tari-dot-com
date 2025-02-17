'use client';

import React from 'react';
import { Button, Dot, Text, TextWrapper, Wrapper } from './styles';
import ArrowIcon from './ArrowIcon';

export default function MinersCTA() {
    return (
        <Wrapper>
            <TextWrapper>
                <Dot />
                <Text>37.5K active miners</Text>
            </TextWrapper>
            <Button>
                <span>Start Earning Tari</span> <ArrowIcon />
            </Button>
        </Wrapper>
    );
}
