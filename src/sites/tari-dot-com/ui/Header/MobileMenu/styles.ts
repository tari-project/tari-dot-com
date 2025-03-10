'use client';

import { motion } from 'motion/react';
import styled from 'styled-components';

export const Wrapper = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    z-index: 98;

    background-color: #000;
    color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;

    pointer-events: all;

    padding: 120px 20px 40px 20px;
`;
