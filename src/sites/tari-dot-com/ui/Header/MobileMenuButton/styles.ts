'use client';

import { motion } from 'motion/react';
import styled from 'styled-components';

export const Wrapper = styled.button`
    display: none;

    width: 50px;
    height: 50px;

    align-items: center;
    justify-content: center;

    transform: translateX(10px);
    cursor: pointer;

    @media (max-width: 886px) {
        display: flex;
    }
`;

export const IconContainer = styled.div`
    width: 25px;
    height: 14px;
    position: relative;
`;

export const Line = styled(motion.div)`
    height: 3px;
    background-color: #fff;
    border-radius: 1px;
    position: absolute;
`;
