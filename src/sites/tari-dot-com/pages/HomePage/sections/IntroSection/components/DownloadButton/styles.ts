'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled(motion.div)`
    position: relative;
    width: 362px;
`;

export const Button = styled(Link)`
    position: relative;
    z-index: 1;
    cursor: pointer;
    width: 100%;
    height: 60px;
    padding: 20px 18px 20px 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    user-select: none;
    text-decoration: none;

    border-radius: 70px;
    overflow: hidden;

    background: linear-gradient(90deg, #5a63d3 0%, #3342ff 48.5%, #23297c 100%),
        linear-gradient(0deg, #813bf5 0%, #813bf5 100%), #262140;

    &:hover {
        text-decoration: none;
    }
`;

export const Text = styled(motion.div)`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 94.2%;
    letter-spacing: -0.75px;
    white-space: nowrap;

    position: relative;
    z-index: 1;
`;

export const Icons = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    position: relative;
    z-index: 1;
    flex-shrink: 0;
`;

export const HoverGradient = styled(motion.div)`
    position: absolute;
    inset: 0;
    background: linear-gradient(270deg, #6656d3 1.03%, #d080cf 49.03%, #e88f5b 100%),
        linear-gradient(0deg, #813bf5 0%, #813bf5 100%), #262140;
    z-index: 0;
`;

export const Word = styled(motion.span)`
    display: inline-block;
`;
