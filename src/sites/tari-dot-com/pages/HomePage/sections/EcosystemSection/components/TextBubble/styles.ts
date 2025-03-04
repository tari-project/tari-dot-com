'use client';

import { motion } from 'motion/react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -5px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

export const OuterWrapper = styled.div`
    position: absolute;
    z-index: 3;
    animation: ${float} 3s ease-in-out infinite;
    perspective: 1000px;
`;

export const Wrapper = styled(motion.div)`
    display: flex;
    align-items: center;
    gap: 15px;

    border-radius: 56px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: #292929;

    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.5);
    transform-style: preserve-3d;

    flex-shrink: 0;
    padding: 18px 30px;

    will-change: transform;
    transition: box-shadow 0.3s ease;
    cursor: default;

    &:hover {
        box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.6);
    }

    &:nth-child(1) {
        animation-delay: 0s;
    }
    &:nth-child(2) {
        animation-delay: -1s;
    }
    &:nth-child(3) {
        animation-delay: -2s;
    }

    @media (max-width: 1297px) {
        padding: 15px 20px;
    }

    @media (max-width: 1035px) {
        display: none;
    }
`;

export const Avatar = styled.div<{ $image: string }>`
    width: 40px;
    height: 40px;
    background-image: url(${(props) => props.$image});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    transform: translateZ(10px);
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    transform: translateZ(5px);
`;

export const Text = styled.div`
    color: #fff;
    font-family: var(--font-alliance), sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
    letter-spacing: -0.981px;

    @media (max-width: 1297px) {
        font-size: 16px;
    }
`;

export const Username = styled.div`
    color: #fff;
    font-family: var(--font-alliance), sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -0.785px;

    opacity: 0.5;

    @media (max-width: 1297px) {
        font-size: 14px;
    }
`;
