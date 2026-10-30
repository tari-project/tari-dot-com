'use client';

import { useMinerStats } from '@/services/api/useMinerStats';
import { Dot, TextWrapper, Text, NumberWrapper } from './styles';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
const NumberFlow = dynamic(() => import('@number-flow/react'), { ssr: false });

interface Props {
    theme: 'light' | 'dark';
    variant?: 'main' | 'ootle';
}

export default function ActiveNodes({ theme }: Props) {
    const { data, isError } = useMinerStats();
    // Start at 0, then very shortly afterward go to the real number,
    // Giving a neat roll-up effect.
    const countValue = data?.confirmed_nodes_24h ?? 0;
    const pathname = usePathname();
    const isOotlePage = pathname === '/ootle' || pathname === '/';
    const variant = isOotlePage ? 'ootle' : 'main';

    return (
        <TextWrapper>
            <Dot $theme={theme} $variant={variant} />
            <Text $theme={theme} $variant={variant}>
                <NumberWrapper>
                    {(isError && <span>???</span>) || (
                        <NumberFlow
                            value={countValue}
                            format={{
                                notation: countValue > 100000 ? 'compact' : 'standard',
                                compactDisplay: 'short',
                                maximumFractionDigits: 1,
                            }}
                        />
                    )}
                </NumberWrapper>
                active nodes
            </Text>
        </TextWrapper>
    );
}
