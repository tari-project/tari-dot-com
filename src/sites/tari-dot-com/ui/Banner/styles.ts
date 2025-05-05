'use client';

import Link from 'next/link';
import styled from 'styled-components';
import backgroundImage from './images/background.png';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 57px;
    background-color: #1e1e25;
    background-image: url(${backgroundImage.src});
    background-size: cover;
    background-position: center;

    position: relative;
    z-index: 99;

    @media (max-width: 886px) {
        height: 40px;
    }

    @media (max-width: 492px) {
        height: auto;
        flex-direction: column;
        padding: 10px 20px;
    }
`;

export const Holder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    max-width: 1604px;
    margin: 0 auto;
    width: 100%;

    gap: 13px;
`;

export const Text = styled.p`
    color: #fff;
    text-align: center;
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 94.2%;
    text-transform: uppercase;

    @media (max-width: 886px) {
        font-size: 12px;
    }
`;

export const GradientText = styled.span`
    background: linear-gradient(90deg, #35ffbf 0%, #baba43 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
`;

export const Button = styled(Link)`
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.4);

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0px 20px;
    height: 32px;

    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 94.2%;

    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        text-decoration: none;
        border: 1px solid rgba(255, 255, 255, 0.6);
    }

    @media (max-width: 886px) {
        font-size: 11px;
        height: 26px;
        padding: 0px 15px;
    }
`;
