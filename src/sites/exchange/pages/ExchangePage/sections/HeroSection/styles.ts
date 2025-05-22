'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;

    position: relative;
    margin: 0 auto;

    display: flex;
    align-items: stretch;
`;

export const MiddleWrapper = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    align-self: stretch;
`;

export const ContentWrapper = styled.div`
    width: 100%;

    max-width: 1553px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;

    margin: 0 auto;

    position: relative;
    z-index: 1;

    padding: 40px;

    @media (max-width: 980px) {
        padding: 20px;
        gap: 20px;
    }
`;
