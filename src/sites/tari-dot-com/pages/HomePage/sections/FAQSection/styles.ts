'use client';

import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ $lightMode?: boolean }>`
    padding: 160px 40px;
    width: 100%;
    color: #fff;

    ${({ $lightMode }) =>
        $lightMode &&
        css`
            color: #000;
        `}

    @media (max-width: 666px) {
        padding: 90px 20px 10px 20px;
    }
`;

export const Holder = styled.div<{ $maxWidth?: number }>`
    width: 100%;
    max-width: 1604px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;

    ${({ $maxWidth }) =>
        $maxWidth &&
        css`
            max-width: ${$maxWidth}px;
        `}
`;

export const Title = styled.div`
    font-family: var(--font-druk), sans-serif;
    font-size: 95px;
    font-style: normal;
    font-weight: 800;
    line-height: 97.2%;
    text-transform: uppercase;

    @media (max-width: 1334px) {
        font-size: 80px;
    }

    @media (max-width: 1158px) {
        font-size: 60px;
    }

    @media (max-width: 460px) {
        font-size: 55px;
    }
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SeeAllButton = styled(Link)`
    font-family: var(--font-poppins), sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    letter-spacing: -0.54px;
    text-decoration: none;

    color: #000;
    background-color: #fff;
    border-radius: 10px;

    padding: 12px 60px;

    width: fit-content;
    margin: 0 auto;
    transition: all 0.3s ease-in-out;
    text-align: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 40px;

    transition: all 0.3s ease-in-out;

    &:hover {
        text-decoration: none;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(1);
    }

    @media (max-width: 768px) {
        font-size: 16px;
        padding: 12px 40px;
    }
`;
