'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    margin: auto;
    width: 100%;
    max-width: 1300px;

    padding-left: calc(329px + 30px); /* Space for the sticky element (entry width + gap) */
`;

export const StickyEntryWrapper = styled.div`
    position: absolute;
    left: 0px;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    z-index: 10;
    padding-right: 30px;
`;

export const Divider = styled.div`
    height: 58px;
    width: 1px;
    background: rgba(154, 151, 146, 0.2);
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
`;

export const LoadingPlaceholder = styled.div`
    width: 100%;
    height: 89px;
`;
