'use client';

import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import {
    Wrapper,
    StickyEntryWrapper,
    Divider,
    LoadingPlaceholder,
    InsideHolder,
    MobileScroll,
    BlockEntryPlaceholder,
} from './styles';
import { useBlocks, BlockData } from '@/services/api/useBlocks';
import { timeAgo } from '../../utils/formatting';

const BlockEntry = lazy(() => import('./BlockEntry/BlockEntry'));
const BlockScrollList = lazy(() => import('./BlockScrollList/BlockScrollList'));

export default function BlockExplorerMini() {
    const { data, isLoading, isError } = useBlocks();

    const [stickyEntry, setStickyEntry] = useState<BlockData | null>(null);
    const [scrollList, setScrollList] = useState<BlockData[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        const updateStickyEntry = (isSolved: boolean) => {
            if (!data || data.length === 0) return null;
            return {
                ...data[0],
                id: (parseInt(data[0].id) + 1).toString(),
                timeAgo: timeAgo(data[0].timeAgo),
                isSolved,
            };
        };

        const updateScrollList = () => {
            if (!data || data.length === 0) return [];
            return data.map((block) => ({
                ...block,
                timeAgo: timeAgo(block.timeAgo),
            }));
        };

        if (data && data.length > 0) {
            if (isFirstRender.current) {
                setStickyEntry(updateStickyEntry(false));
                setScrollList(updateScrollList());
                isFirstRender.current = false;
            } else {
                setStickyEntry(updateStickyEntry(true));
                setTimeout(() => {
                    setStickyEntry((prev) => (prev ? { ...prev, isSolved: false } : null));
                    setScrollList(updateScrollList());
                }, 3000);
            }
        }

        const interval = setInterval(() => {
            if (data && data.length > 0) {
                setScrollList(updateScrollList());
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [data]);

    if (isLoading) {
        return <LoadingPlaceholder />;
    }

    if (isError) {
        return <LoadingPlaceholder />;
    }

    return (
        <Wrapper ref={containerRef}>
            <MobileScroll>
                <InsideHolder>
                    <StickyEntryWrapper>
                        <Suspense fallback={<BlockEntryPlaceholder />}>
                            {stickyEntry && (
                                <BlockEntry
                                    key={stickyEntry.id}
                                    id={stickyEntry.id}
                                    minersSolved={stickyEntry.minersSolved}
                                    reward={stickyEntry.reward}
                                    timeAgo={stickyEntry.timeAgo}
                                    isSolved={stickyEntry.isSolved}
                                    blocks={stickyEntry.blocks}
                                    isFirstEntry={true}
                                />
                            )}
                        </Suspense>
                        <Divider />
                    </StickyEntryWrapper>

                    <BlockScrollList data={scrollList} containerRef={containerRef} />
                </InsideHolder>
            </MobileScroll>
        </Wrapper>
    );
}
