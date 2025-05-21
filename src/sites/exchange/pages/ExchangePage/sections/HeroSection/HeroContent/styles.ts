'use client';

import styled from 'styled-components';

export const Wrapper = styled.div<{ $bgImage: string }>`
    width: 100%;
    height: 680px;
    flex-grow: 1;

    border-radius: 20px;

    background-image: url(${({ $bgImage }) => $bgImage});
    background-size: cover;
    background-position: right bottom;
    background-repeat: no-repeat;

    padding: 80px;
    padding-bottom: 160px;
    position: relative;

    display: flex;
    align-items: flex-end;

    @media (max-width: 1266px) {
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 660px) {
        padding: 5px;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: auto;
    }
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 1266px) {
        align-items: center;
        text-align: center;
        margin-top: -100px;
    }

    @media (max-width: 660px) {
        margin: 0;
        padding: 50px 0;
    }
`;

export const Eyebrow = styled.div`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 84.2%;
    text-transform: uppercase;

    @media (max-width: 980px) {
        font-size: 16px;
    }
`;

export const Title = styled.div`
    color: #fff;
    font-family: var(--font-druk), sans-serif;
    font-size: 58px;
    font-style: normal;
    font-weight: 500;
    line-height: 101%;
    text-transform: uppercase;

    @media (max-width: 980px) {
        font-size: 48px;
    }
`;

export const BottomWrapper = styled.div`
    display: flex;
    gap: 0px;
    align-items: flex-end;
    justify-content: space-between;
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
