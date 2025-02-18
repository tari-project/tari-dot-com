'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    border-radius: 50px;
    background: #dfe5f2;
    padding: 35px;
    color: #111;
    width: 682px;
    height: 456px;
    flex: 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
`;

export const TextWrapper = styled.div`
    max-width: 364px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 23px;
`;

export const Title = styled.div`
    color: #111;
    font-family: var(--font-druk), sans-serif;
    font-size: 75px;
    font-style: normal;
    font-weight: 800;
    line-height: 87.2%;
    text-transform: uppercase;
`;

export const Text = styled.div`
    color: #404040;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
`;

export const ImageWrapper = styled.div<{ $image?: string }>`
    width: 295px;
    height: 371px;
    border-radius: 20px;
    overflow: hidden;
    background-color: #292929;
    background-image: url(${({ $image }) => $image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: 50%;
    right: -50px;
    transform: translateY(-50%);
`;

export const ImageBorder = styled.div`
    position: absolute;
    inset: 0;
    z-index: 1;
    box-shadow: inset 0px 0px 0px 3px rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    mix-blend-mode: overlay;
`;
