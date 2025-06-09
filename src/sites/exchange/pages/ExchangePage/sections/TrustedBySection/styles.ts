'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 30px 0 100px 0;

    @media (max-width: 660px) {
        padding: 30px 0 30px 0;
    }
`;

export const TopBorder = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 50px;
`;

export const BottomBorder = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

export const Label = styled.div`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
    background-color: #161616;
    white-space: nowrap;

    padding: 0 30px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: 660px) {
        font-size: 16px;
        padding: 0 10px;
    }
`;

export const Line = styled.div`
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.15);
`;
