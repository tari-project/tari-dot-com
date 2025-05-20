'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100dvh;

    position: relative;

    margin: 0 auto;

    display: flex;
`;

export const MiddleWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;

export const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    max-width: 1553px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 60px;

    margin: 0 auto;

    position: relative;
    z-index: 1;

    padding: 40px;
`;
