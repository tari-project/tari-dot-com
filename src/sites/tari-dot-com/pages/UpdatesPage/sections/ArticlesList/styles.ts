'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100dvh;

    display: flex;

    background-color: #e4e3ec;

    padding: 0 20px;
    padding-top: 200px;
    padding-bottom: 200px;
`;

export const Holder = styled.div`
    min-height: 889px;
    max-width: 1151px;
    width: 100%;
    margin: auto;
`;

export const PageTitle = styled.div`
    color: #111;
    font-family: var(--font-druk), sans-serif;
    font-size: 80px;
    font-style: normal;
    font-weight: 800;
    line-height: 94.2%;
    text-transform: uppercase;
    width: 100%;
    padding-bottom: 57px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
