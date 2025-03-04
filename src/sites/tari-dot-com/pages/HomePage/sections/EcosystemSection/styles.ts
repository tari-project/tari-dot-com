'use client';

import { motion } from 'motion/react';
import styled, { keyframes } from 'styled-components';

const rotateClockwise = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const rotateCounterClockwise = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
`;

export const Wrapper = styled.div`
    width: 100%;
    max-height: 1610px;
    aspect-ratio: 1 / 1;

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    overflow: hidden;
`;

export const TextMiddle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 22px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: 1158px) {
        gap: 15px;
    }
`;

export const Eyebrow = styled.div`
    color: #dfe5f2;
    text-align: center;
    font-family: var(--font-poppins), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
`;

export const Title = styled.div`
    color: #dfe5f2;
    text-align: center;
    font-family: var(--font-druk), sans-serif;
    font-size: 100px;
    font-style: normal;
    font-weight: 800;
    line-height: 94.2%;
    text-transform: uppercase;

    max-width: 790px;

    @media (max-width: 1334px) {
        font-size: 80px;
    }

    @media (max-width: 1158px) {
        font-size: 60px;
        max-width: 400px;
    }
`;

export const Text = styled.div`
    color: #dfe5f2;
    text-align: center;
    font-family: var(--font-poppins), sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;

    max-width: 434px;

    @media (max-width: 1158px) {
        font-size: 16px;
    }
`;

export const FloatingElements = styled(motion.div)`
    position: absolute;
    top: 50%;
    left: 50%;

    width: 100%;
    aspect-ratio: 1 / 1;
    max-width: 1554px;

    transform: translate(-50%, -50%) perspective(1000px);
`;

export const CircleHolder = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 0;
    transform: translate(-50%, -50%) perspective(1000px);

    width: 100%;
    aspect-ratio: 1 / 1;
    transform-style: preserve-3d;
    transition: transform 0.1s ease-out;
    will-change: transform;
`;

export const Circle1 = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 44%;
    height: 44%;

    border: 2px solid #f8f8f8;
    opacity: 0.1;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
`;

export const Circle2 = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${rotateCounterClockwise} 200s linear infinite;

    width: 74%;
    height: 74%;

    border: 2px dashed #f8f8f8;
    opacity: 0.1;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
`;

export const Circle3 = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${rotateClockwise} 300s linear infinite;

    width: 100%;
    height: 100%;

    border: 2px dashed #f8f8f8;
    opacity: 0.03;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
`;
