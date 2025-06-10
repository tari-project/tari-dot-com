'use client';

import styled from 'styled-components';

export const Wrapper = styled.div<{ $bgImage: string }>`
    width: 100%;
    height: 680px;
    flex-grow: 1;

    border-radius: 20px;

    padding: 60px;
    padding-bottom: 120px;
    position: relative;

    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    overflow: hidden;

    @media (max-width: 1220px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: auto;
        padding: 0px;
        padding-bottom: 120px;
        border-radius: 0px;
        gap: 40px;
    }

    @media (max-width: 700px) {
        padding-bottom: 150px;
    }
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 20px;
    z-index: 2;
    max-width: 600px;
`;

export const Eyebrow = styled.div`
    font-family: var(--font-druk-wide), sans-serif;

    color: #fff;

    font-size: 19px;
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

    font-size: 52px;
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

export const WhiteText = styled.span`
    color: #fff;
`;

export const YellowText = styled.span<{ $color: string }>`
    color: ${({ $color }) => $color};
    font-style: italic;
    font-weight: 800;
`;

export const BottomWrapper = styled.div`
    display: flex;
    gap: 0px;
    align-items: flex-end;
    justify-content: flex-start;
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

    @media (max-width: 1220px) {
        position: relative;
        height: 400px;
        object-fit: unset;
    }
`;

export const Shadow = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(22, 22, 22, 0.8) 0%, rgba(22, 22, 22, 0) 80%);
    z-index: 1;

    @media (max-width: 1220px) {
        display: none;
    }
`;

export const TopSlope = styled.div`
    position: absolute;
    top: -2%;
    left: 0;
    width: 100%;
    height: 20%;
    background: linear-gradient(3deg, transparent 0%, transparent 50%, #161616 50%, #161616 100%);
    z-index: 1;
`;

export const BottomSlope = styled.div`
    position: absolute;
    bottom: -2%;
    left: 0;
    width: 100%;
    height: 20%;
    background: linear-gradient(3deg, #161616 0%, #161616 50%, transparent 50%, transparent 100%);
    z-index: 1;
`;
