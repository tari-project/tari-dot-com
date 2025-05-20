'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: flex-end;

    background-color: #161616;
    padding: 20px 30px 20px 20px;

    border-radius: 0 20px 0 0;
`;

export const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const IconGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    white-space: nowrap;

    svg {
        flex-shrink: 0;
    }

    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 94.2%;
    letter-spacing: -0.7px;
`;

export const GradientText = styled.span`
    background: linear-gradient(90deg, #ff7dfd 38.7%, #389fff 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const Divider = styled.div`
    width: 1px;
    height: 26px;
    background: rgba(255, 255, 255, 0.25);
`;
