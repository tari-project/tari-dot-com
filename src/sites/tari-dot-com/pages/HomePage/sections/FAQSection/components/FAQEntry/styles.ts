'use client';

import { motion } from 'motion/react';
import styled, { css } from 'styled-components';

export const Wrapper = styled(motion.div)<{ $lightMode?: boolean }>`
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;

    ${({ $lightMode }) =>
        $lightMode &&
        css`
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        `}
`;

export const Question = styled.div`
    cursor: pointer;
    width: 100%;
    padding: 30px 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    gap: 40px;

    @media (max-width: 666px) {
        gap: 20px;
        padding: 20px 0;
    }
`;

export const QuestionText = styled.div`
    font-family: var(--font-poppins), sans-serif;
    font-size: 36px;
    font-style: normal;
    font-weight: 500;
    line-height: 110%;

    @media (max-width: 1158px) {
        font-size: 30px;
    }

    @media (max-width: 989px) {
        font-size: 22px;
    }

    @media (max-width: 666px) {
        font-size: 18px;
    }
`;

export const Answer = styled(motion.div)`
    font-family: var(--font-poppins), sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: -0.54px;
    overflow: hidden;
    transform-origin: top;

    padding-right: 166px;

    p {
        margin-bottom: 20px;
    }

    ul,
    ol {
        padding-left: 20px;
        margin-bottom: 20px;
    }

    a {
        text-decoration: underline;
    }

    @media (max-width: 1158px) {
        padding-right: 100px;
        font-size: 16px;
    }

    @media (max-width: 666px) {
        padding-right: 0;
        font-size: 14px;
    }
`;

export const AnswerPadding = styled.div`
    padding-bottom: 30px;

    @media (max-width: 666px) {
        padding-bottom: 20px;
    }
`;

export const ToggleIcon = styled.button`
    cursor: pointer;
    flex-shrink: 0;

    width: 51px;
    height: 51px;

    color: inherit;

    svg {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 666px) {
        width: 38px;
        height: 38px;
    }
`;
