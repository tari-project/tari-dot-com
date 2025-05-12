'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    margin: auto;
    width: 100%;
    max-width: 1300px;

    @media (max-width: 768px) {
        overflow: hidden;
        overflow-x: scroll;
    }
`;

export const InsideHolder = styled.div`
    width: max-content;
    height: 100%;

    display: flex;
    align-items: center;
    position: relative;
`;

export const StickyEntryWrapper = styled.div`
    display: flex;
    align-items: center;
    z-index: 10;

    @media (max-width: 768px) {
        padding-right: 10px;
    }
`;

export const Divider = styled.div`
    height: 58px;
    width: 1px;
    background: rgba(154, 151, 146, 0.2);
    margin: 0 10px 0 30px;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const LoadingPlaceholder = styled.div`
    width: 100%;
    height: 89px;
`;
