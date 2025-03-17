'use client';

import styled, { css } from 'styled-components';
import { motion } from 'motion/react';

export const Wrapper = styled.div`
    width: 100%;
    height: 300vh;
    position: relative;
`;

export const StickyHolder = styled.div`
    position: sticky;
    top: 0;

    width: 100%;
    height: 100vh;
    padding: 160px 60px 70px 60px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 40px;

    @media (max-width: 1228px) {
        padding: 160px 20px 70px 20px;
        height: auto;
    }

    @media (max-height: 900px) {
        padding: 140px 20px 70px 20px;
        gap: 30px;
    }

    @media (max-width: 807px) {
        padding: 140px 20px 70px 20px;
    }
`;

export const TextWrapper = styled.div`
    max-width: 913px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    @media (max-width: 1228px) {
        max-width: 700px;
    }

    @media (max-height: 900px) {
        max-width: 700px;
    }

    @media (max-width: 807px) {
        max-width: 600px;
    }
`;

export const Title = styled.div`
    color: #dfe5f2;
    text-align: center;
    font-family: var(--font-druk), sans-serif;
    font-size: 100px;
    font-style: normal;
    font-weight: 800;
    line-height: 94.2%;
    text-transform: uppercase;

    @media (max-height: 900px) {
        font-size: 80px;
    }

    @media (max-width: 999px) {
        font-size: 80px;
    }

    @media (max-width: 807px) {
        font-size: 60px;
    }

    @media (max-width: 460px) {
        font-size: 55px;
    }
`;

export const Text = styled.div`
    max-width: 701px;
    color: #dfe5f2;
    text-align: center;
    font-family: var(--font-poppins), sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;

    @media (max-width: 999px) {
        font-size: 16px;
    }

    @media (max-width: 807px) {
        font-size: 14px;
    }
`;

export const StepsWrapper = styled.div`
    display: flex;
    gap: 20px;
    max-width: 1480px;

    @media (max-width: 838px) {
        flex-direction: column;
        gap: 15px;
    }
`;

export const Step = styled.div<{ $active: boolean }>`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    padding: 20px;

    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.33);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 2px 4px 16px 0px rgba(248, 248, 248, 0.06) inset;
    backdrop-filter: blur(50px);

    transition: all 0.5s ease;
    opacity: 0.1;

    ${({ $active }) =>
        $active &&
        css`
            opacity: 1;
        `}

    @media (max-width: 1228px) {
        padding: 14px;
    }

    @media (max-height: 900px) {
        padding: 14px;
    }
`;

export const StepInside = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const StepIcon = styled.img`
    width: 90px;
    height: 90px;
    flex-shrink: 0;

    @media (max-width: 1228px) {
        width: 70px;
        height: 70px;
    }

    @media (max-height: 900px) {
        width: 70px;
        height: 70px;
    }
`;

export const TextInner = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StepTitle = styled.div`
    color: #fff;
    font-family: var(--font-druk), sans-serif;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
    text-transform: uppercase;

    @media (max-width: 1228px) {
        font-size: 26px;
    }

    @media (max-height: 900px) {
        font-size: 26px;
    }
`;

export const StepText = styled.div`
    color: rgba(222, 228, 241, 0.6);
    font-family: var(--font-poppins), sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
    max-width: 282px;

    @media (max-width: 1228px) {
        font-size: 10px;
    }

    @media (max-height: 900px) {
        font-size: 10px;
    }
`;

export const StageWrapper = styled.div`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;
    max-width: 1312px;
    min-height: 300px;

    @media (max-width: 653px) {
        width: unset;
        height: unset;
        min-height: 200px;
        max-width: 100%;
        pading: 0 20px;
        aspect-ratio: 16 / 9;
    }

    @media (max-height: 900px) {
        width: unset;
        height: unset;
        min-height: 200px;
        max-width: 100%;
        pading: 0 20px;
        aspect-ratio: 16 / 9;
    }
`;

export const TariIcon = styled(motion.img)`
    width: 170px;
    height: 170px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 2;
`;

export const GlowSquare = styled(motion.div)`
    width: 286px;
    height: 286px;

    border-radius: 94px;
    opacity: 0.4;
    background: rgba(255, 255, 255, 0.01);
    box-shadow: 0px 10px 23px 0px rgba(255, 255, 255, 0.45) inset;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
`;

export const VideoPlayer = styled(motion.div)`
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    transform: translate(-50%, -50%);
    aspect-ratio: 16 / 9;

    background-color: #000;
    border-radius: 20px;
    overflow: hidden;

    iframe {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: none;
    }

    @media (max-width: 653px) {
        height: auto;
        width: 100%;
    }
`;

export const ProgressDonut = styled(motion.svg)`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 286px;
    height: 286px;
    pointer-events: none;
    z-index: 2;
`;
