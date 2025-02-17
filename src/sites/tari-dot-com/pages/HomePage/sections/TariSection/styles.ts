'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 50px 60px 65px 60px;
`;

export const Container = styled.div`
    width: 100%;

    padding: 105px 60px;

    border-radius: 31px;
    color: #000;
    background: #dfe5f2;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Middle = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
`;

export const Eyebrow = styled.div`
    color: #111;
    text-align: center;
    font-family: var(--font-poppins), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
`;

export const MainText = styled.div`
    color: #111;
    text-align: center;
    font-family: var(--font-druk), sans-serif;
    font-size: 100px;
    font-style: normal;
    font-weight: 800;
    line-height: 94.2%;
    text-transform: uppercase;

    max-width: 790px;
`;

export const Text = styled.div`
    color: #111;
    text-align: center;
    font-family: var(--font-poppins), sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;

    max-width: 650px;
`;
