'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding-top: 8px;
    pointer-events: all;
`;

export const ContentBox = styled.div`
    width: 100%;
    min-height: 297px;

    border-radius: 15px;
    background: #fff;
    box-shadow: 10px 10px 75px 0px rgba(0, 0, 0, 0.35);

    padding: 35px;

    display: flex;
    flex-direction: column;
    gap: 18px;
    z-index: 1;
    position: relative;
`;

export const HoverGlue = styled.div`
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    top: -50px;
    left: 20px;
`;

export const SectionTitle = styled.div`
    color: #111;
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 130%;
    text-transform: uppercase;
`;

export const ContentHolder = styled.div`
    display: flex;
    gap: 35px;
`;

export const Links = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    width: 100%;
`;

export const LinkTitle = styled.div`
    color: #0a2540;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    position: relative;
    z-index: 1;

    display: flex;
    align-items: center;
    gap: 6px;
`;

export const Chip = styled.div`
    background: #0a2540;
    border-radius: 100px;
    padding: 0px 6px;
    color: #fff;

    width: fit-content;
    height: 13px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 8px;
    font-weight: 700;
    line-height: 130%;
    text-align: center;
    text-transform: uppercase;
`;

export const LinkText = styled.div`
    color: #111;
    font-family: var(--font-poppins), sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
    opacity: 0.5;
    position: relative;
    z-index: 1;
`;

export const LinkButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    align-self: stretch;

    padding: 10px 15px;

    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    cursor: pointer;

    transition: all 0.2s ease;

    &:hover {
        background-color: #111;

        text-decoration: none;

        ${LinkTitle} {
            color: #fff;
        }

        ${LinkText} {
            color: #fff;
        }

        ${Chip} {
            background: #fff;
            color: #111;
        }
    }

    &:active {
        transform: scale(0.95);
    }
`;

export const TariImage = styled.img`
    width: 363px;
`;
