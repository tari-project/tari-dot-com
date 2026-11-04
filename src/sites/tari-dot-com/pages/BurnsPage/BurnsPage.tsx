'use client';

import { useBurnStats } from '@/services/api/useBurnStats';
import { formatXtm, shortCommitment } from './format';
import {
    Wrapper,
    Holder,
    Tag,
    Title,
    Lede,
    Stats,
    Stat,
    StatValue,
    StatLabel,
    SectionTitle,
    Table,
    Status,
    Empty,
} from './styles';

export default function BurnsPage() {
    const { data, isError, isLoading } = useBurnStats('mainnet');

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
                        <StatValue>{data ? formatXtm(data.totalMicroMinotari) : isError ? '???' : '…'}</StatValue>
                        <StatLabel>XTM burned</StatLabel>
                    </Stat>
                    <Stat>
                        <StatValue>{data ? data.burnCount.toLocaleString('en-US') : isError ? '???' : '…'}</StatValue>
                        <StatLabel>Burns</StatLabel>
                    </Stat>
                    <Stat>
                        <StatValue>
                            {data ? data.uniqueBurners.toLocaleString('en-US') : isError ? '???' : '…'}
                        </StatValue>
                        <StatLabel>Unique burners</StatLabel>
                    </Stat>
                </Stats>

                <SectionTitle>Recent burns</SectionTitle>
                {isLoading && <Empty>Loading…</Empty>}
                {isError && <Empty>Burn stats are unavailable right now. Try again in a minute.</Empty>}
                {data && data.recent.length === 0 && <Empty>No burns reported yet.</Empty>}
                {data && data.recent.length > 0 && (
                    <Table>
                        <thead>
                            <tr>
                                <th>When</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Height</th>
                                <th>Commitment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.recent.map((burn) => (
                                <tr key={burn.commitment}>
                                    <td>
                                        {new Date(burn.createdAt).toLocaleString('en-US', { timeZoneName: 'short' })}
                                    </td>
                                    <td className="mono">{formatXtm(burn.amountMicroMinotari)} XTM</td>
                                    <td>
                                        <Status $confirmed={burn.status === 'confirmed'}>{burn.status}</Status>
                                    </td>
                                    <td className="mono">{burn.minedHeight ?? '–'}</td>
                                    <td className="mono" title={burn.commitment}>
                                        {shortCommitment(burn.commitment)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Holder>
        </Wrapper>
    );
}
