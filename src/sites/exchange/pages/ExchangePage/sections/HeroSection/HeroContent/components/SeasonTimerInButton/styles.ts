'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    color: rgba(0, 0, 0, 0.5);
    font-family: var(--font-poppins), sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.36px;
    line-height: 100%;
    white-space: nowrap;

    display: flex;
    align-items: center;
    gap: 4px;

    position: relative;
    z-index: 1;

    @media (max-width: 430px) {
        font-size: 10px;
    }
`;

export const TimeLeft = styled.span`
    font-variant-numeric: tabular-nums;
    color: #000;
    font-weight: 700;
`;
