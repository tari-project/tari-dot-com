'use client';

import { motion } from 'motion/react';
import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 900px;
    height: calc(100vh - 57px);
    display: flex;
    background-color: #e4e3ec;

    padding: 0 20px;

    @media (max-width: 807px) {
        min-height: auto;
        padding: 130px 20px 100px 20px;
    }

    @media (max-width: 900px) {
        padding-top: 110px;
    }
`;

export const Holder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80px;
    margin: 0 auto;

    @media (max-width: 1320px) {
        gap: 0px;
    }

    @media (max-width: 807px) {
        flex-direction: column-reverse;
        gap: 30px;
    }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const MainImage = styled(motion.img)`
    width: 50%;
    animation: ${rotate} 200s linear infinite;

    @media (max-height: 900px) {
        max-height: 600px;
    }
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 656px;
    width: 100%;

    @media (max-width: 807px) {
        align-items: center;
    }
`;

export const EyebrowWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 807px) {
        display: none;
    }
`;

export const EyebrowText = styled.div`
    color: #111;
    text-align: center;
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

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Title = styled.div`
    color: #111;
    font-family: var(--font-druk), sans-serif;
    font-size: 120px;
    font-style: normal;
    font-weight: 800;
    line-height: 84.2%;
    text-transform: uppercase;

    @media (max-width: 1181px) {
        font-size: 100px;
    }

    @media (max-width: 999px) {
        font-size: 80px;
    }

    @media (max-width: 807px) {
        font-size: 60px;
    }
`;

export const Text = styled.div`
    color: #111;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
    max-width: 590px;

    @media (max-width: 999px) {
        font-size: 16px;
    }

    @media (max-width: 807px) {
        font-size: 14px;
    }
`;
