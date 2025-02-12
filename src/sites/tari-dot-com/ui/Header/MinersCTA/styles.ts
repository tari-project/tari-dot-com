'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 17px;

    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);

    height: 54px;
    padding: 10px 6px 10px 18px;
`;

export const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 11px;
`;

export const Dot = styled.div`
    width: 11px;
    height: 11px;
    background: linear-gradient(180deg, #0f9 0%, #b0d636 100%);
    border-radius: 50%;
`;

export const Text = styled.div`
    background: linear-gradient(180deg, #00ff99 0%, #b0d636 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-family: var(--font-alliance), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 94.2%;
    letter-spacing: -0.75px;
`;

export const Button = styled.div`
    border-radius: 10px;
    background: #fff;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    height: 43px;
    padding: 0px 15px 0px 20px;

    color: #1b1b1b;
    font-family: var(--font-alliance), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 94.2%;
    letter-spacing: -0.75px;
`;
