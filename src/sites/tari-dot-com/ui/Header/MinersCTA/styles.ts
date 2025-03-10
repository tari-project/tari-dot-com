'use client';

import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';

const radarPulse = keyframes`
    0% {
        transform: scale(1);
        opacity: 0.6;
    }
    100% {
        transform: scale(2.5);
        opacity: 0;
    }
`;

export const Wrapper = styled.div<{ $theme: 'light' | 'dark' }>`
    display: flex;
    align-items: center;
    gap: 17px;

    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);

    height: 54px;
    padding: 10px 6px 10px 18px;

    position: relative;
    flex-shrink: 0;

    ${({ $theme }) =>
        $theme === 'light' &&
        css`
            border: none;
            background: none;
            padding: 0;
        `}

    @media (max-width: 450px) {
        flex-direction: column;
        height: auto;
        padding: 20px;
    }
`;

export const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 11px;
    position: relative;
`;

export const Dot = styled.div<{ $theme: 'light' | 'dark' }>`
    width: 11px;
    height: 11px;
    background: linear-gradient(180deg, #0f9 0%, #b0d636 100%);
    border-radius: 50%;

    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%) translateY(1px);
    z-index: 1;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: inherit;
        border-radius: 50%;
        z-index: -1;
        animation: ${radarPulse} 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
`;

export const Text = styled.div<{ $theme: 'light' | 'dark' }>`
    color: #71ee73;
    font-family: var(--font-alliance), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 94.2%;
    letter-spacing: -0.75px;
    font-variant-numeric: tabular-nums;

    ${({ $theme }) =>
        $theme === 'light' &&
        css`
            color: #26764e;
        `}
`;

export const ButtonWrapper = styled.div`
    position: relative;
    z-index: 1;
`;

export const Button = styled(Link)<{ $theme: 'light' | 'dark' }>`
    position: relative;
    z-index: 1;
    border-radius: 10px;
    background: #fff;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    height: 43px;
    padding: 0px 15px 0px 20px;

    color: #1b1b1b;
    font-family: var(--font-alliance), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 94.2%;
    letter-spacing: -0.75px;

    transition: transform 0.3s ease;
    user-select: none;
    text-decoration: none;

    ${({ $theme }) =>
        $theme === 'light' &&
        css`
            background: #000;
            color: #fff;
        `}

    .arrow-icon {
        transition: transform 0.3s ease;
    }

    &:hover {
        transform: scale(1.05);
        text-decoration: none;

        .arrow-icon {
            transform: translateX(5px);
        }
    }
`;

export const NumberWrapper = styled.span`
    display: inline-block;
    text-align: right;
    margin-right: 4px;
    margin-left: 24px;
    text-transform: lowercase;
    transform: translateY(0.3px);
    transition: width 0.3s ease;
    min-width: 37px;
`;
