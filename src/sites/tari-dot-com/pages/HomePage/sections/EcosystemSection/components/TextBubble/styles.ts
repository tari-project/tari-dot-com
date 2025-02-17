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

export const Wrapper = styled.div`
    position: absolute;
    z-index: 3;

    display: flex;
    align-items: center;
    gap: 15px;

    border-radius: 56px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: #292929;

    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.5);

    flex-shrink: 0;
    padding: 18px 30px;

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
        animation-delay: -2s;
    }

    &:hover {
        scale: 1.1;
    }
`;

export const Avatar = styled.div<{ $image: string }>`
    width: 40px;
    height: 40px;
    background-image: url(${(props) => props.$image});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Text = styled.div`
    color: #fff;
    font-family: var(--font-alliance), sans-serif;
    font-size: 19.628px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
    letter-spacing: -0.981px;
`;

export const Username = styled.div`
    color: #fff;
    font-family: var(--font-alliance), sans-serif;
    font-size: 15.703px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -0.785px;

    opacity: 0.5;
`;
