'use client';

import styled from 'styled-components';
import backgroundImage from './images/background.png';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100dvh;

    display: flex;
    flex-direction: column;
`;

export const DarkBackground = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    color: #fff;

    background: url(${backgroundImage.src}) no-repeat;
    background-size: contain;
    background-color: #111;
`;
