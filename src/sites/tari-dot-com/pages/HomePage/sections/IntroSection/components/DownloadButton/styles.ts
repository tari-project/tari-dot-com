'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled(motion.div)`
    position: relative;
    width: fit-content;
`;

export const Button = styled(Link)`
    position: relative;
    z-index: 1;
    cursor: pointer;

    width: fit-content;
    height: 60px;
    padding: 20px 6px 20px 30px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    user-select: none;
    text-decoration: none;

    border-radius: 70px;
    background: linear-gradient(90deg, #5a63d3 0%, #3342ff 48.5%, #23297c 100%),
        linear-gradient(0deg, #813bf5 0%, #813bf5 100%), #0f0e14;

    box-shadow: 0 4px 6px -1px rgba(90, 99, 211, 0.1), 0 2px 4px -1px rgba(51, 66, 255, 0.06),
        0 10px 15px -3px rgba(129, 59, 245, 0.1), 0 15px 25px -4px rgba(90, 99, 211, 0.1),
        0 0 20px 0px rgba(51, 66, 255, 0.2);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);

    &:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 6px 8px -1px rgba(90, 99, 211, 0.15), 0 4px 6px -1px rgba(51, 66, 255, 0.1),
            0 15px 25px -3px rgba(129, 59, 245, 0.15), 0 25px 35px -4px rgba(90, 99, 211, 0.15),
            0 0 30px 0px rgba(51, 66, 255, 0.25);
        text-decoration: none;
    }
`;

export const Text = styled.div`
    color: #fff;
    font-family: var(--font-alliance), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 94.2%;
    letter-spacing: -0.75px;
`;

export const Icons = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;

    padding: 6px 10px;

    border-radius: 50px;
    background: rgba(0, 0, 0, 0.2);
`;

export const ConfettiTarget = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 0;
`;
