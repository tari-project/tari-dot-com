'use client';

import styled from 'styled-components';
import { motion } from 'motion/react';

export const Wrapper = styled(motion.div)``;

export const Pill = styled(motion.div)`
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;

    border-radius: 50px;
    background: linear-gradient(0deg, #111 0%, #111 100%), #fff;

    height: 39px;
    padding: 0px 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    @media (max-width: 999px) {
        font-size: 16px;
    }

    @media (max-width: 807px) {
        font-size: 14px;
    }
`;

export const ContentContainer = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LetterWrapper = styled.div`
    position: relative;
    overflow: hidden;
    height: 24px;
    display: inline-block;
`;

export const LetterAnimation = styled(motion.span)`
    display: inline-block;
    white-space: pre;
    position: absolute;
`;

export const LetterSpacer = styled.span`
    visibility: hidden;
    display: inline-block;
    white-space: pre;
`;
