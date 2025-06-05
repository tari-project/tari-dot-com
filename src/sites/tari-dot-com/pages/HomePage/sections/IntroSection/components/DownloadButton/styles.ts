'use client';

import { motion } from 'motion/react';
import styled, { css } from 'styled-components';

export const Wrapper = styled(motion.div)`
    position: relative;
    width: 368px;

    @media (max-width: 430px) {
        width: 100%;
    }
`;

export const Button = styled.button<{ $backgroundColor?: string }>`
    position: relative;
    z-index: 1;
    cursor: pointer;
    width: 100%;
    height: 60px;
    padding: 20px 20px 20px 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    user-select: none;
    text-decoration: none;

    border-radius: 70px;
    overflow: hidden;
    width: 100%;

    background: linear-gradient(90deg, #5a63d3 0%, #3342ff 48.5%, #23297c 100%),
        linear-gradient(0deg, #813bf5 0%, #813bf5 100%), #262140;

    ${({ $backgroundColor }) =>
        $backgroundColor &&
        css`
            background: ${$backgroundColor};
        `}

    &:hover {
        text-decoration: none;
    }
`;

export const Text = styled(motion.div)<{ $textColor?: string }>`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 94.2%;
    letter-spacing: -0.75px;
    white-space: nowrap;

    ${({ $textColor }) =>
        $textColor &&
        css`
            color: ${$textColor};
        `}

    position: relative;
    z-index: 1;

    @media (max-width: 600px) {
        font-size: 14px;
    }
`;

export const Icons = styled.div<{ $showIconBackground?: boolean }>`
    display: flex;
    align-items: center;
    gap: 6px;

    position: absolute;
    right: 6px;
    top: 5px;
    z-index: 1;
    flex-shrink: 0;

    border-radius: 50px;
    padding: 6px 7px;

    ${({ $showIconBackground }) =>
        $showIconBackground &&
        css`
            background: rgba(0, 0, 0, 0.2);
        `}
`;

export const HoverGradient = styled(motion.div)`
    position: absolute;
    inset: 0;
    background: linear-gradient(270deg, #6656d3 1.03%, #d080cf 49.03%, #e88f5b 100%),
        linear-gradient(0deg, #813bf5 0%, #813bf5 100%), #262140;
    z-index: 0;

    @media (max-width: 400px) {
        display: none;
    }
`;

export const Word = styled(motion.span)`
    display: inline-block;
`;
