'use client';

import { motion } from 'motion/react';
import styled from 'styled-components';

export const Wrapper = styled(motion.div)`
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 115px;
    aspect-ratio: 115 / 84;

    border-radius: 23px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);

    margin: 0 4px;

    top: -11px;

    @media (max-width: 1000px) {
        width: 100px;
        topl: -9px;
    }

    @media (max-width: 666px) {
        width: 80px;
        top: -7px;
    }

    @media (max-width: 460px) {
        width: 60px;
        top: -5px;
        border-radius: 12px;
    }
`;

export const Image = styled.img<{ $isActive: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    pointer-events: none;

    &:first-child {
        position: relative;
        visibility: ${({ $isActive }) => ($isActive ? 'visible' : 'hidden')};
    }
`;
