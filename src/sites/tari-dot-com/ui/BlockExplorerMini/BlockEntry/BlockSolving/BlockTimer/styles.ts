'use client';

import { motion } from 'motion/react';
import styled from 'styled-components';

export const Wrapper = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 100px;
    background: #fff;

    padding: 0px 7px 2px 7px;
    height: 20px;

    color: #030303;
    font-family: var(--font-poppins), sans-serif;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    width: fit-content;
    min-width: 46px;

    span {
        transform: translateY(0.5px);
    }
`;
