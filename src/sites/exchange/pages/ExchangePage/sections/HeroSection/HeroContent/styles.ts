'use client';

import styled from 'styled-components';

export const Wrapper = styled.div<{ $bgImage: string }>`
    width: 100%;
    height: 680px;
    flex-grow: 1;

    border-radius: 20px;

    background-image: url(${({ $bgImage }) => $bgImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    padding: 80px;
    padding-bottom: 160px;
    position: relative;

    display: flex;
    align-items: flex-end;
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Eyebrow = styled.div`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 84.2%;
    text-transform: uppercase;
`;

export const Title = styled.div`
    color: #fff;
    font-family: var(--font-druk), sans-serif;
    font-size: 58px;
    font-style: normal;
    font-weight: 500;
    line-height: 101%;
    text-transform: uppercase;
`;

export const BottomWrapper = styled.div`
    display: flex;
    gap: 20px;
    align-items: flex-end;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`;
