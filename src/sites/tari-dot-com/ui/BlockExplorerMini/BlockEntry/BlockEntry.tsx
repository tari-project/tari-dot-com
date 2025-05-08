'use client';

import BlockSolved from './BlockSolved/BlockSolved';
import BlockSolving from './BlockSolving/BlockSolving';

export interface BlockData {
    id: string;
    minersSolved: number;
    reward?: number; // XTM reward amount
    timeAgo?: string;
    isSolving?: boolean;
    blocks?: number;
    isFirstEntry?: boolean;
}

interface Props extends BlockData {
    isFirstEntry?: boolean;
}

export default function BlockEntry({ id, minersSolved, reward, timeAgo, blocks, isFirstEntry }: Props) {
    return (
        <>
            {isFirstEntry ? (
                <BlockSolving id={id} minersSolved={minersSolved} reward={reward} timeAgo={timeAgo} blocks={blocks} />
            ) : (
                <BlockSolved id={id} minersSolved={minersSolved} reward={reward} timeAgo={timeAgo} blocks={blocks} />
            )}
        </>
    );
}
