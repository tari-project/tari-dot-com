'use client';

import { motion } from 'motion/react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    margin: auto;
    width: 100%;
    max-width: 1300px;

    padding-left: calc(329px + 30px); /* Space for the sticky element (entry width + gap) */
`;

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

export const StickyEntryWrapper = styled.div`
    position: absolute;
    left: 0px;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    z-index: 10;
    padding-right: 30px;
`;

export const DragContainer = styled(motion.div)`
    display: flex;
    gap: 8px;
    will-change: transform;
    padding-right: 600px;
    width: fit-content;
`;

export const Divider = styled.div`
    height: 58px;
    width: 1px;
    background: rgba(154, 151, 146, 0.2);
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
`;
