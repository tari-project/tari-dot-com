'use client';

import { useBurnStats } from '@/services/api/useBurnStats';
import { formatXtm } from './format';
import { Wrapper, Holder, Tag, Title, Lede, Stats, Stat, StatValue, StatLabel, Note } from './styles';

export default function BurnsPage() {
    const { data, isError } = useBurnStats('mainnet');
    const show = (value: string | undefined) => value ?? (isError ? '???' : '…');

    return (
        <Wrapper>
            <Holder>
                <Tag>Burn to L2</Tag>
                <Title>
                    XTM burned <em>for the Ootle</em>
                </Title>
                <Lede>
                    Burning XTM on layer 1 is the only way to mint TARI on the Ootle. These are the burns Tari Universe
                    has reported so far, checked against the Minotari network. Burn from the wallet in{' '}
                    <a href="/downloads">Tari Universe</a>, or read how the two tokens relate in the{' '}
                    <a href="/tokenomics">tokenomics</a>.
                </Lede>

                <Stats>
                    <Stat>
                        <StatValue>{show(data && formatXtm(data.totalMicroMinotari))}</StatValue>
                        <StatLabel>XTM burned</StatLabel>
                    </Stat>
                    <Stat>
                        <StatValue>{show(data?.burnCount.toLocaleString('en-US'))}</StatValue>
                        <StatLabel>Burns</StatLabel>
                    </Stat>
                    <Stat>
                        <StatValue>{show(data?.uniqueBurners.toLocaleString('en-US'))}</StatValue>
                        <StatLabel>Unique burners</StatLabel>
                    </Stat>
                </Stats>

                {isError && <Note>Burn stats are unavailable right now. Try again in a minute.</Note>}
            </Holder>
        </Wrapper>
    );
}
