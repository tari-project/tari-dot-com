'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 54px;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

export const LeftSide = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    position: absolute;
    left: 0;
    top: 0;
`;

export const RightSide = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    position: absolute;
    right: 0;
    top: 0;
`;

export const OutlineButton = styled.button`
    border-radius: 10px;
    border: 1px solid #fff;

    height: 40px;
    padding: 9px 19px 9px 19px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 94.2%;
    letter-spacing: -0.71px;
`;

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;
