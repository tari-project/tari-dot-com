'use client';

import { motion } from 'motion/react';
import styled, { css, keyframes } from 'styled-components';

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
    z-index: 2;
    animation: ${float} 3s ease-in-out infinite;

    @media (max-width: 960px) {
        &.mobile-hide {
            display: none;
        }
    }
`;

export const Wrapper = styled(motion.div)<{ $isLandscape: boolean }>`
    background-color: #292929;
    border-radius: 20px;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.5);

    width: 295px;
    aspect-ratio: 295 / 371;

    ${({ $isLandscape }) =>
        $isLandscape &&
        css`
            iframe,
            img {
                transform: scale(2.3) !important;
            }
        `}

    position: relative;
    overflow: hidden;
    will-change: transform, scale;

    &:nth-child(1) {
        animation-delay: 0s;
    }
    &:nth-child(2) {
        animation-delay: -1s;
    }
    &:nth-child(3) {
        animation-delay: 0s;
    }
    &:nth-child(4) {
        animation-delay: -2s;
    }

    @media (max-width: 1250px) {
        width: 230px;
    }

    @media (max-width: 1045px) {
        width: 190px;
    }
`;

export const InsideBorder = styled.div`
    position: absolute;
    inset: 0;
    z-index: 1;
    box-shadow: inset 0px 0px 0px 3px rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    mix-blend-mode: overlay;
`;

export const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 0;

    iframe,
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        position: absolute;
        transform: scale(1.4);
    }
`;

export const Image = styled.img``;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 7px;
    padding: 20px;

    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 50%;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
`;

export const Username = styled.div`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    display: flex;
    align-items: center;
    gap: 4px;

    svg {
        width: 23px;
        height: 23px;
        transform: translateY(2px);
    }

    @media (max-width: 1045px) {
        font-size: 15px;
    }
`;

export const Followers = styled.div`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    @media (max-width: 1045px) {
        font-size: 12px;
    }
`;
