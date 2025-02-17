'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 17px;
`;

export const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 11px;
`;

export const Dot = styled.div`
    width: 11px;
    height: 11px;
    background: linear-gradient(180deg, #17fb9b 0%, #b1d644 100%);
    border-radius: 50%;
`;

export const Text = styled.div`
    background: linear-gradient(180deg, #237850 0%, #526c34 100%);
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
    background: #000;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    height: 43px;
    padding: 0px 15px 0px 20px;

    color: #fff;
    font-family: var(--font-alliance), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 94.2%;
    letter-spacing: -0.75px;
`;
