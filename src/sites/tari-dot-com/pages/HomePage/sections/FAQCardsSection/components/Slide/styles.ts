'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    border-radius: 50px;
    background: #dfe5f2;
    padding: 35px;
    color: #111;
    width: 682px;
    aspect-ratio: 682 / 456;

    flex: 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;

    @media (max-width: 1000px) {
        padding: 25px;
        width: 500px;
    }

    @media (max-width: 666px) {
        padding: 0px 20px;
        width: 360px;
    }
`;

export const TextWrapper = styled.div`
    max-width: 364px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 23px;

    @media (max-width: 1000px) {
        max-width: 270px;
        gap: 10px;
    }

    @media (max-width: 666px) {
        max-width: 190px;
        gap: 10px;
    }
`;

export const Title = styled.div`
    color: #111;
    font-family: var(--font-druk), sans-serif;
    font-size: 75px;
    font-style: normal;
    font-weight: 800;
    line-height: 87.2%;
    text-transform: uppercase;

    @media (max-width: 1000px) {
        font-size: 60px;
    }

    @media (max-width: 666px) {
        font-size: 45px;
    }
`;

export const Text = styled.div`
    color: #404040;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;

    @media (max-width: 666px) {
        font-size: 12px;
    }
`;

export const ImageWrapper = styled.div<{ $image?: string }>`
    width: 295px;
    aspect-ratio: 295 / 371;

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

    @media (max-width: 1000px) {
        width: 220px;
        right: -35px;
    }

    @media (max-width: 666px) {
        width: 160px;

        right: -25px;
    }
`;

export const ImageBorder = styled.div`
    position: absolute;
    inset: 0;
    z-index: 1;
    box-shadow: inset 0px 0px 0px 3px rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    mix-blend-mode: overlay;
`;
