'use client';

import { motion } from 'motion/react';
import styled, { css } from 'styled-components';

export const Wrapper = styled(motion.div)<{ $subTextComponent?: boolean; $isVera?: boolean }>`
    position: relative;
    width: 368px;

    ${({ $subTextComponent }) =>
        $subTextComponent &&
        css`
            width: unset;
        `}

    @media (max-width: 430px) {
        width: 100%;
        ${({ $isVera }) =>
            $isVera &&
            css`
                display: none;
            `}
    }
`;

export const Button = styled.button<{ $backgroundColor?: string; $glow?: boolean }>`
    position: relative;
    z-index: 1;
    cursor: pointer;
    width: 100%;
    height: 60px;
    padding: 0px 6px 0px 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    user-select: none;
    text-decoration: none;

    border-radius: 70px;
    overflow: hidden;
    transition: transform 0.5s ease;

    background: linear-gradient(90deg, #5a63d3 0%, #3342ff 48.5%, #23297c 100%),
        linear-gradient(0deg, #813bf5 0%, #813bf5 100%), #262140;

    ${({ $backgroundColor }) =>
        $backgroundColor &&
        css`
            background: ${$backgroundColor};
        `}

    ${({ $glow }) =>
        $glow &&
        css`
            box-shadow: 0px 0px 54px 0px rgba(143, 188, 255, 0.5);
        `}

    &:hover {
        text-decoration: none;
        transform: scale(1.05);
    }

    @media (max-width: 430px) {
        padding-left: 20px;
        gap: 10px;
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

    z-index: 1;
    flex-shrink: 0;

    border-radius: 50px;
    padding: 6px 7px;

    ${({ $showIconBackground }) =>
        $showIconBackground &&
        css`
            background: rgba(0, 0, 0, 0.2);
        `}

    @media (max-width: 430px) {
        gap: 2px;
    }
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

export const TextGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
`;

export const SubText = styled.div`
    color: rgba(0, 0, 0, 0.5);
    font-family: var(--font-poppins), sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.36px;
    line-height: 100%;
    position: relative;
    z-index: 1;
`;
