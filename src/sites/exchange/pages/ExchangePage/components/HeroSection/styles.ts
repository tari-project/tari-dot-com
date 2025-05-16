'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100dvh;
    position: relative;
    max-height: 800px;
    max-width: 1920px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 60px;

    margin: 0 auto;

    position: relative;
    z-index: 1;

    padding: 120px;
`;
