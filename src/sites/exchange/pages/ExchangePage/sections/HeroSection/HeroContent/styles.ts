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

    padding: 80px;
    padding-bottom: 100px;
    position: relative;

    display: flex;
    align-items: flex-end;
    justify-content: center;
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

    @media (max-width: 980px) {
        font-size: 48px;
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

    @media (max-width: 1266px) {
        flex-direction: column-reverse;
        align-items: flex-end;
        padding: 10px;
    }

    @media (max-width: 660px) {
        padding: 0px;
        position: relative;
    }
`;
