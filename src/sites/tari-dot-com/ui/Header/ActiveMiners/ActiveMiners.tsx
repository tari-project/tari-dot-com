'use client';

import { useMinerStats } from '@/services/api/useMinerStats';
import { Dot, TextWrapper, Text, NumberWrapper } from './styles';
import dynamic from 'next/dynamic';
const NumberFlow = dynamic(() => import('@number-flow/react'), { ssr: false });

interface Props {
    theme: 'light' | 'dark';
}

export default function ActiveMiners({ theme }: Props) {
    const { data } = useMinerStats();
    const countValue = data?.totalMiners ?? 0;

    return (
        <TextWrapper>
            <Dot $theme={theme} />
            <Text $theme={theme}>
                <NumberWrapper>
                    <NumberFlow
                        value={countValue}
                        format={{
                            notation: countValue > 100000 ? 'compact' : 'standard',
                            compactDisplay: 'short',
                            maximumFractionDigits: 1,
                        }}
                    />
                </NumberWrapper>
                active miners
            </Text>
        </TextWrapper>
    );
}
