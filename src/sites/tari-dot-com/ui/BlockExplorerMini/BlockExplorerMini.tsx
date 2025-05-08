'use client';

import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useAnimation } from 'motion/react';
import { Wrapper, DragContainer, StickyEntryWrapper, ScrollMask, Divider } from './styles';
import { BlockData } from './BlockEntry/BlockEntry';
import { initialBlockData } from './data';

const BlockEntry = lazy(() => import('./BlockEntry/BlockEntry'));

export default function BlockExplorerMini() {
    const [blockData, setBlockData] = useState<BlockData[]>(initialBlockData);
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
    }, [blockData]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * (initialBlockData.length - 1)) + 1;
            const randomEntry = { ...initialBlockData[randomIndex] };

            const newBlockId = parseInt(blockData[0].id.replace(/,/g, '')) + 1;
            const formattedId = newBlockId.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            randomEntry.id = formattedId;

            randomEntry.minersSolved = Math.floor(Math.random() * 100) + 100;
            randomEntry.reward = Math.floor(Math.random() * 10) + 445;
            randomEntry.blocks = Math.floor(Math.random() * 1000);

            setBlockData((prevBlocks) => {
                const newBlocks = [randomEntry, ...prevBlocks];
                if (newBlocks.length > 10) {
                    return newBlocks.slice(0, 10);
                }
                return newBlocks;
            });

            if (!isDragging) {
                controls.start({
                    x: 0,
                    transition: { type: 'spring', stiffness: 50, damping: 10, mass: 1 },
                });
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [blockData, controls, isDragging]);

    const stickyEntry = blockData[0];
    const scrollingEntries = blockData.slice(1);

    return (
        <Wrapper ref={containerRef}>
            <StickyEntryWrapper>
                <Suspense fallback={<div></div>}>
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
                        {scrollingEntries.map(({ id, minersSolved, reward, timeAgo, isSolving, blocks }) => (
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
