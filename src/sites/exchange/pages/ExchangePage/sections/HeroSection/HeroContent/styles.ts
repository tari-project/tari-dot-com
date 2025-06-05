'use client';

import styled from 'styled-components';

export const Wrapper = styled.div<{ $bgImage: string }>`
    width: 100%;
    height: 680px;
    flex-grow: 1;

    border-radius: 20px;

    background-image: url(${({ $bgImage }) => $bgImage});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

    padding: 40px;
    padding-bottom: 100px;
    position: relative;

    display: flex;
    align-items: flex-end;
    justify-content: center;

    @media (max-width: 700px) {
        height: 700px;
        padding: 10px;
        padding-bottom: 150px;
    }
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
`;

export const Eyebrow = styled.div<{ $color: string }>`
    font-family: var(--font-druk-wide), sans-serif;

    color: ${({ $color }) => $color};
    text-align: center;
    font-size: 18.64px;
    font-style: normal;
    font-weight: 500;
    line-height: 84.2%;
    text-transform: uppercase;

    @media (max-width: 1263px) {
        font-size: 16px;
    }

    @media (max-width: 1024px) {
        font-size: 14px;
    }
`;

export const Title = styled.div`
    color: #fff;
    font-family: var(--font-druk-wide), sans-serif;

    text-align: center;
    font-size: 57px;
    font-style: normal;
    font-weight: 700;
    line-height: 101%;
    text-transform: uppercase;

    @media (max-width: 1263px) {
        font-size: 48px;
    }

    @media (max-width: 1024px) {
        font-size: 40px;
    }
`;

export const WhiteText = styled.div`
    color: #fff;
`;

export const YellowText = styled.div<{ $color: string }>`
    color: ${({ $color }) => $color};
    font-style: italic;
    font-weight: 800;
`;

export const BottomWrapper = styled.div`
    display: flex;
    gap: 0px;
    align-items: flex-end;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`;
