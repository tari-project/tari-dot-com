'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Button, ButtonWrapper, Dot, NumberWrapper, Text, TextWrapper, Wrapper } from './styles';
import ArrowIcon from './ArrowIcon';
import { useMinerStats } from '@/services/api/useMinerStats';

import dynamic from 'next/dynamic';
import { useDownloadUniverse } from '@/services/api/useDownloadUniverse';
const NumberFlow = dynamic(() => import('@number-flow/react'), { ssr: false });

interface Props {
    theme: 'light' | 'dark';
    buttonText: string;
    hoverAnimation?: boolean;
    hoverText?: string;
    noBackground?: boolean;
}

export default function MinersCTA({ theme, buttonText, noBackground }: Props) {
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

    const { handleDownloadClick } = useDownloadUniverse();

    return (
        <Wrapper $theme={theme} $noBackground={noBackground}>
            <TextWrapper>
                <Dot $theme={theme} />
                <Text $theme={theme}>
                    <NumberWrapper style={{ width: `${numberWidth}px` }}>
                        <span ref={numberRef}>
                            <NumberFlow
                                value={countValue}
                                format={{
                                    notation: countValue > 10000 ? 'compact' : 'standard',
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
                <Button $theme={theme} href="/downloads" onClick={handleDownloadClick}>
                    <span>{buttonText}</span> <ArrowIcon className="arrow-icon" />
                </Button>
            </ButtonWrapper>
        </Wrapper>
    );
}
