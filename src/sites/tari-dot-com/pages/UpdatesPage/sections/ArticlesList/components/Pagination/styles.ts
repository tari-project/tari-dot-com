'use client';

import styled from 'styled-components';
import Link from 'next/link';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding-top: 60px;
`;

export const PageNumber = styled(Link)<{ $active?: boolean }>`
    padding: 0px 10px;
    background-color: ${(props) => (props.$active ? '#4e22d0' : '#fff')};
    color: ${(props) => (props.$active ? 'white' : 'inherit')};
    border-radius: 1000px;
    text-decoration: none;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 44px;
    min-width: 44px;

    font-family: var(--font-poppins), sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: -0.34px;

    &:hover {
        background-color: ${(props) => (props.$active ? '#4e22d0' : '#f5f5f5')};
        text-decoration: none;
    }
`;

export const PageButton = styled(PageNumber)`
    padding: 0px 20px;
`;

export const DotDotDot = styled.span`
    padding: 10px;
    font-family: var(--font-poppins), sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: -0.34px;
`;

export const PageNumbers = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    padding: 0 40px;

    @media (max-width: 807px) {
        display: none;
    }
`;
