'use client';

import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Wrapper, StickyEntryWrapper, Divider, LoadingPlaceholder, InsideHolder } from './styles';
import { useBlocks, BlockData } from '@/services/api/useBlocks';

const BlockEntry = lazy(() => import('./BlockEntry/BlockEntry'));
const BlockScrollList = lazy(() => import('./BlockScrollList/BlockScrollList'));

export default function BlockExplorerMini() {
    const { data, isLoading, isError } = useBlocks();

    const [stickyEntry, setStickyEntry] = useState<BlockData | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (data && data.length > 0) {
            setStickyEntry({
                ...data[0],
                id: (parseInt(data[0].id) + 1).toString(),
            });
        }
    }, [data]);

    if (isLoading) {
        return <LoadingPlaceholder />;
    }

    if (isError) {
        return <LoadingPlaceholder />;
    }

    return (
        <Wrapper ref={containerRef}>
            <InsideHolder>
                <StickyEntryWrapper>
                    <Suspense fallback={<div />}>
                        {stickyEntry && (
                            <BlockEntry
                                key={stickyEntry.id}
                                id={stickyEntry.id}
                                minersSolved={stickyEntry.minersSolved}
                                reward={stickyEntry.reward}
                                timeAgo={stickyEntry.timeAgo}
                                isSolving={stickyEntry.isSolving}
                                blocks={stickyEntry.blocks}
                                isFirstEntry={true}
                            />
                        )}
                        <Divider />
                    </Suspense>
                </StickyEntryWrapper>

                <BlockScrollList data={data} containerRef={containerRef} />
            </InsideHolder>
        </Wrapper>
    );
}
