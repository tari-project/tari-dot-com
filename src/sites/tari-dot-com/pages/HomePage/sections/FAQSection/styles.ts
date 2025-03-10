'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 160px 40px;
    width: 100%;

    @media (max-width: 666px) {
        padding: 80px 20px;
    }
`;

export const Holder = styled.div`
    width: 100%;
    max-width: 1604px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

export const Title = styled.div`
    color: #fff;
    font-family: var(--font-druk), sans-serif;
    font-size: 95px;
    font-style: normal;
    font-weight: 800;
    line-height: 97.2%;
    text-transform: uppercase;

    @media (max-width: 1334px) {
        font-size: 80px;
    }

    @media (max-width: 1158px) {
        font-size: 60px;
        max-width: 400px;
    }
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
`;
