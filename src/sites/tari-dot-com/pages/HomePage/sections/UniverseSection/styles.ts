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
`;

export const TextWrapper = styled.div`
    max-width: 913px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
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
`;

export const StepsWrapper = styled.div`
    display: flex;
    gap: 20px;
    max-width: 1480px;
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
`;

export const StepInside = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const StepProgress = styled.div<{ $progress: number }>`
    width: 95%;
    height: 2px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    overflow: hidden;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: ${(props) => props.$progress}%;
        background: rgba(255, 255, 255, 0.15);
        transition: width 0.2s ease-out;
        border-radius: 30px;
    }
`;

export const StepIcon = styled.img`
    width: 90px;
    height: 90px;
    flex-shrink: 0;
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
    line-height: 130%;
    text-transform: uppercase;
`;

export const StepText = styled.div`
    color: rgba(222, 228, 241, 0.6);
    font-family: var(--font-poppins), sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
    max-width: 282px;
`;

export const StageWrapper = styled.div`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;
    max-width: 1312px;
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

export const FolderFront = styled(motion.img)`
    width: 206px;
    height: 147px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 3;
    margin-top: 27px;
`;

export const FolderImage = styled(motion.img)`
    width: 206px;
    height: 200px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 1;
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
`;
