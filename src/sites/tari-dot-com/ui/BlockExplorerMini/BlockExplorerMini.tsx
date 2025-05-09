'use client';

import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useAnimation } from 'motion/react';
import { Wrapper, DragContainer, StickyEntryWrapper, ScrollMask, Divider } from './styles';
import { useBlocks, BlockData } from '@/services/api/useBlocks';

const BlockEntry = lazy(() => import('./BlockEntry/BlockEntry'));

export default function BlockExplorerMini() {
    const { data, isLoading, isError } = useBlocks();
    const [stickyEntry, setStickyEntry] = useState<BlockData | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const dragContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const x = useMotionValue(0);
    const springConfig = { stiffness: 400, damping: 100, mass: 1 };
    const springX = useSpring(x, springConfig);
    const controls = useAnimation();

    const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

    useEffect(() => {
        if (containerRef.current && dragContainerRef.current) {
            const calculateConstraints = () => {
                const containerWidth = containerRef.current?.clientWidth || 0;
                const contentWidth = dragContainerRef.current?.scrollWidth || 0;

                if (contentWidth > containerWidth) {
                    setDragConstraints({
                        left: -(contentWidth - containerWidth),
                        right: 0,
                    });
                } else {
                    setDragConstraints({ left: 0, right: 0 });
                }
            };

            calculateConstraints();

            const resizeObserver = new ResizeObserver(calculateConstraints);
            resizeObserver.observe(containerRef.current);
            resizeObserver.observe(dragContainerRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }
    }, [data]);

    useEffect(() => {
        if (data && data.length > 0) {
            setStickyEntry({
                ...data[0],
                id: (parseInt(data[0].id) + 1).toString(),
            });
        }

        if (!isDragging) {
            controls.start({
                x: 0,
                transition: { type: 'spring', stiffness: 50, damping: 10, mass: 1 },
            });
        }
    }, [data, controls, isDragging]);

    if (isLoading) {
        return <div></div>;
    }
    if (isError) {
        return <div></div>;
    }

    const scrollingEntries = data;

    return (
        <Wrapper ref={containerRef}>
            <StickyEntryWrapper>
                <Suspense fallback={<div></div>}>
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

            <ScrollMask>
                <DragContainer
                    ref={dragContainerRef}
                    drag="x"
                    dragConstraints={dragConstraints}
                    dragElastic={0.1}
                    style={{ x: springX }}
                    dragTransition={{
                        power: 0.8,
                        timeConstant: 700,
                        modifyTarget: (target) => Math.round(target / 50) * 50,
                    }}
                    animate={controls}
                    onDragStart={() => {
                        setIsDragging(true);
                    }}
                    onDragEnd={() => {
                        setIsDragging(false);
                    }}
                >
                    <Suspense fallback={<div></div>}>
                        {scrollingEntries &&
                            scrollingEntries.map(({ id, minersSolved, reward, timeAgo, isSolving, blocks }) => (
                                <BlockEntry
                                    key={id}
                                    id={id}
                                    minersSolved={minersSolved}
                                    reward={reward}
                                    timeAgo={timeAgo}
                                    isSolving={isSolving}
                                    blocks={blocks}
                                />
                            ))}
                    </Suspense>
                </DragContainer>
            </ScrollMask>
        </Wrapper>
    );
}
