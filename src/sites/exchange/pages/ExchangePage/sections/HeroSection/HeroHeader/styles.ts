'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #fff;
`;

export const LeftSide = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 980px) {
        display: none;
    }
`;

export const RightSide = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
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

    span {
        display: block;
        transition: transform 0.3s ease-in-out;
    }

    &:hover {
        span {
            transform: scale(1.1);
        }
    }
`;

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;

    svg,
    img {
        flex-shrink: 0;
        height: 38px;
        width: auto;
    }

    @media (max-width: 980px) {
        svg,
        img {
            height: 30px;
        }
    }

    .cross-icon {
        width: 6px;
        height: 6px;
    }
`;

export const LogoImage = styled.img`
    height: 38px;
    color: #fff;
`;
