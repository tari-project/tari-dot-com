'use client';

import { motion } from 'motion/react';
import styled from 'styled-components';

export const ScrollMask = styled(motion.div)`
    display: flex;
    align-items: center;
    position: relative;
    cursor: grab;

    gap: 27px;
    overflow-y: hidden;
    overflow-x: hidden;
    padding-right: 16px;
    padding-left: 16px;

    width: 100%;
    mask-image: linear-gradient(to right, transparent, black 20px, black calc(100% - 100px), transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent, black 20px, black calc(100% - 100px), transparent 100%);

    &:active {
        cursor: grabbing;
    }
`;

export const DragContainer = styled(motion.div)`
    display: flex;
    gap: 8px;
    will-change: transform;
    padding-right: 600px;
    width: fit-content;
`;
