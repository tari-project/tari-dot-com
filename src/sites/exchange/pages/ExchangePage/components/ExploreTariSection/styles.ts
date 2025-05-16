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
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 31px;
    width: 100%;
`;

export const Title = styled.div`
    color: #fff;
    text-align: center;
    font-family: var(--font-druk), sans-serif;
    font-size: 133px;
    font-style: italic;
    font-weight: 700;
    line-height: 100%;
    letter-spacing: 1.333px;
    text-transform: uppercase;

    span {
        color: #3e86c9;
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

export const DiagonalYellowBox = styled.div`
    position: absolute;
    bottom: 14%;
    left: 50%;
    transform: translateX(-50%) rotate(-16deg);
    width: 200%;
    height: 40%;
    background: #3e86c9;
    z-index: 0;
`;

export const ShadowWrapper = styled.div`
    position: absolute;
    bottom: 0%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    padding: 0 20px;
`;

export const ShadowHolder = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
`;

export const ShadowBox = styled.div`
    width: 200%;
    height: 40%;
    background: linear-gradient(140deg, rgba(22, 22, 22, 0.01) 7%, #161616 32%);
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
`;
