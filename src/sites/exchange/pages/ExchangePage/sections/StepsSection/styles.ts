'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100dvh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 94px;

    padding: 160px 60px;
`;

export const Holder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    max-width: 1559px;
    width: 100%;
    position: relative;
    z-index: 1;
    margin: 0 auto;
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0px;
    width: 100%;
`;

export const StepsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
`;

export const Step = styled.div`
    position: relative;
`;

export const StepInside = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;
    border-radius: 20px;
    overflow: hidden;

    border: 1px solid #2b2b2b;
`;

export const StepTitle = styled.div`
    color: #fff;
    font-family: var(--font-druk), sans-serif;
    font-size: 35px;
    font-style: normal;
    font-weight: 800;
    line-height: 36px;
    letter-spacing: 0.35px;
    text-transform: uppercase;

    position: absolute;
    bottom: 10%;
    left: 10%;
`;

export const BgImage = styled.img`
    width: 100%;
    object-fit: cover;
`;
