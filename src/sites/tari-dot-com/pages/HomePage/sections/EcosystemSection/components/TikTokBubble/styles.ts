'use client';

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

export const Wrapper = styled.div<{ $image: string }>`
    position: absolute;
    z-index: 2;

    background-image: url(${(props) => props.$image});
    background-size: cover;
    background-position: center;

    border-radius: 20px;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.5);

    width: 295px;
    height: 371px;
    overflow: hidden;

    animation: ${float} 3s ease-in-out infinite;
    transition: scale 2s cubic-bezier(0.215, 0.61, 0.355, 1);
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

    &:hover {
        scale: 1.1;
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

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;

    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 50%;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
`;

export const Username = styled.div`
    color: #fff;
    font-family: var(--font-alliance), sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

export const Followers = styled.div`
    color: #fff;
    font-family: var(--font-alliance), sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
