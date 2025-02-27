'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 50px 60px 65px 60px;

    @media (max-width: 1000px) {
        padding: 50px 20px 65px 20px;
    }
`;

export const Container = styled.div`
    width: 100%;
    max-width: 1604px;

    padding: 105px 60px;

    border-radius: 31px;
    color: #000;
    background: #dfe5f2;

    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1000px) {
        padding: 80px 40px;
    }
`;

export const Middle = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;

    @media (max-width: 1000px) {
        gap: 30px;
    }

    @media (max-width: 666px) {
        gap: 20px;
    }
`;

export const Eyebrow = styled.div`
    color: #111;
    text-align: center;
    font-family: var(--font-poppins), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;

    @media (max-width: 666px) {
        font-size: 12px;
    }
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

    @media (max-width: 1000px) {
        font-size: 80px;
    }

    @media (max-width: 666px) {
        font-size: 60px;
    }
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

    @media (max-width: 666px) {
        font-size: 16px;
    }
`;
