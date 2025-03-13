'use client';

import { motion } from 'motion/react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100dvh;
    position: relative;
`;

export const Holder = styled.div`
    width: 100%;
    padding: 160px 60px 70px 60px;
    max-width: 1604px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 57px;

    @media (max-width: 1228px) {
        padding: 160px 20px 70px 20px;
    }

    @media (max-height: 900px) {
        padding: 140px 20px 70px 20px;
    }

    @media (max-width: 807px) {
        padding: 140px 20px 70px 20px;
    }
`;

export const TextWrapper = styled.div`
    max-width: 768px;
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
`;

export const Text = styled.div`
    max-width: 751px;
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

export const VideoPlayer = styled(motion.div)`
    width: 100%;
    z-index: 3;

    max-width: 1604px;

    background-color: #000;
    border-radius: 74px;
    overflow: hidden;

    padding: 20px;
    background-color: #ececfb66;
    border: 1px solid #fff;

    iframe {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: none;
        border-radius: 50px;
        border: 1px solid #fff;
        aspect-ratio: 16 / 9;
        background-color: #000;
        display: block;
    }

    @media (max-width: 807px) {
        border-radius: 10px;
        padding: 6px;

        iframe {
            border-radius: 10px;
        }
    }
`;
