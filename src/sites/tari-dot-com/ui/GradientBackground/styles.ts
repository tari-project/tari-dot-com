'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
`;

export const GradientCanvas = styled.canvas`
    display: block;
    width: 100%;
    height: 100%;
    transform: scaleY(-1);
`;
