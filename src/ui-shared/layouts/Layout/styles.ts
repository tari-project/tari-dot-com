'use client';

import styled from 'styled-components';

export const AppWrapper = styled.div`
    width: 100%;
    min-height: 100dvh;
    background-size: cover;
    background-position: center;
    /*
    This background color isn't visible in practice, but most closely approximates the gradients
    used by the WebGL canvas drawing, allowing us to still get useful feedback from automated accessibility checks.
    Note that this means this value has to be kept in sync with the values in the GradientBackground component.
     */
    background-color: #111;
    position: relative;
    z-index: 0;
`;

export const ExchangeWrapper = styled.div`
    width: 100%;
    min-height: 100dvh;
    background-color: #161616;
`;
