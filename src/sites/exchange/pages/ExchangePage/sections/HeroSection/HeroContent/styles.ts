'use client';

import styled from 'styled-components';

export const Wrapper = styled.div<{ $bgImage: string }>`
    width: 100%;
    height: 680px;
    flex-grow: 1;

    border-radius: 20px;

    background-image: url(${({ $bgImage }) => $bgImage});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

    padding: 40px;
    padding-bottom: 120px;
    position: relative;

    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;

    @media (max-width: 700px) {
        height: 700px;
        padding: 10px;
        padding-bottom: 150px;
        border-radius: 0px;
    }
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    z-index: 2;
`;

export const Eyebrow = styled.div`
    font-family: var(--font-druk-wide), sans-serif;

    color: #fff;
    text-align: center;
    font-size: 18.64px;
    font-style: normal;
    font-weight: 500;
    line-height: 84.2%;
    text-transform: uppercase;

    @media (max-width: 1263px) {
        font-size: 16px;
    }

    @media (max-width: 1024px) {
        font-size: 14px;
    }
`;

export const Title = styled.div`
    color: #fff;
    font-family: var(--font-druk-wide), sans-serif;

    text-align: center;
    font-size: 57px;
    font-style: normal;
    font-weight: 700;
    line-height: 101%;
    text-transform: uppercase;

    @media (max-width: 1263px) {
        font-size: 48px;
    }

    @media (max-width: 1024px) {
        font-size: 40px;
    }

    @media (max-width: 700px) {
        font-size: 30px;
    }
`;

export const WhiteText = styled.div`
    color: #fff;
`;

export const YellowText = styled.div<{ $color: string }>`
    color: ${({ $color }) => $color};
    font-style: italic;
    font-weight: 800;
`;

export const BottomWrapper = styled.div`
    display: flex;
    gap: 0px;
    align-items: flex-end;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;

    @media (max-width: 1024px) {
        .curve {
            display: none;
        }
    }
`;

export const VideoWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        object-fit: cover;
    }
`;

export const Shadow = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(22, 22, 22, 0.8) 0%, rgba(22, 22, 22, 0) 100%);
    z-index: 1;
`;
