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

export const FloatingWrapper = styled.div`
    position: absolute;
    z-index: 3;
    animation: ${float} 3s ease-in-out infinite;
`;

export const InViewWrapper = styled(motion.div)``;

export const Wrapper = styled(motion.div)`
    display: flex;
    align-items: center;
    gap: 15px;
    max-width: 305px;

    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: #292929;

    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.5);
    transform-style: preserve-3d;

    flex-shrink: 0;
    padding: 20px 30px 20px 20px;

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

    @media (max-width: 1250px) {
        padding: 12px 18px;
        width: 100%;
        max-width: 220px;
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
    flex-shrink: 0;

    @media (max-width: 1250px) {
        width: 30px;
        height: 30px;
    }
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    transform: translateZ(5px);
    gap: 4px;
`;

export const Text = styled.div`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
    letter-spacing: -0.981px;

    @media (max-width: 1250px) {
        font-size: 14px;
    }
`;

export const Username = styled.div`
    color: rgba(255, 255, 255, 0.5);
    font-family: var(--font-poppins), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -0.785px;

    display: flex;
    align-items: center;
    gap: 5px;

    @media (max-width: 1250px) {
        font-size: 12px;
    }
`;
