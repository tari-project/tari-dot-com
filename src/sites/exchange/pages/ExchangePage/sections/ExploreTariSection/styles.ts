'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 60px 300px 60px;
    position: relative;
    z-index: 1;

    @media (max-width: 1545px) {
        padding: 100px 40px 300px 40px;
    }

    @media (max-width: 660px) {
        padding: 60px 10px 200px 10px;
    }
`;

export const Holder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 78px;

    max-width: 1671px;
    width: 100%;
    position: relative;
    z-index: 1;

    @media (max-width: 660px) {
        gap: 40px;
    }
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 31px;
    width: 100%;

    @media (max-width: 1200px) {
        gap: 20px;
    }

    @media (max-width: 660px) {
        gap: 10px;
    }
`;

export const Title = styled.div<{ $color: string }>`
    color: #fff;
    text-align: center;
    font-family: var(--font-druk), sans-serif;
    font-size: 133px;
    font-style: italic;
    font-weight: 700;
    line-height: 100%;
    letter-spacing: 1.333px;
    text-transform: uppercase;

    @media (max-width: 1200px) {
        font-size: 100px;
    }

    @media (max-width: 700px) {
        font-size: 60px;
    }

    span {
        color: ${({ $color }) => $color};
        font-style: normal;
    }
`;

export const Text = styled.div`
    color: #fff;
    text-align: center;
    font-family: var(--font-poppins), sans-serif;
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: 129.2%;
    width: 100%;

    opacity: 0.75;

    @media (max-width: 1200px) {
        font-size: 20px;
    }

    @media (max-width: 700px) {
        font-size: 16px;
    }
`;

export const BackgroundWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
`;

export const DiagonalYellowBox = styled.div<{ $color: string }>`
    position: absolute;
    bottom: 14%;
    left: 50%;
    transform: translateX(-50%) rotate(-16deg);
    width: 200%;
    height: 40%;
    background: ${({ $color }) => $color};
    z-index: 0;
`;

export const ShadowWrapper = styled.div`
    position: absolute;
    bottom: -10%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    padding: 0 20px;

    @media (max-width: 1545px) {
        padding: 0 10px;
    }

    @media (max-width: 660px) {
        padding: 0 2px;
    }
`;

export const ShadowHolder = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
`;

export const ShadowBox = styled.div`
    width: 200%;
    height: 50%;
    background: linear-gradient(180deg, rgba(22, 22, 22, 0.01) 0%, #161616 40%);
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) rotate(-16deg);
`;
