'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 auto;
    width: 100%;

    padding: 20px 60px 60px 60px;

    @media (max-width: 1090px) {
        padding: 20px 20px 60px 20px;
    }

    @media (max-width: 768px) {
        padding: 20px 0px 60px 0px;
    }
`;

export const MobileScroll = styled.div`
    display: flex;
    width: 100%;

    @media (max-width: 768px) {
        overflow: hidden;
        overflow-x: scroll;
        padding-left: 10px;
    }
`;

export const InsideHolder = styled.div`
    width: max-content;
    height: 100%;
    max-width: 1300px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    position: relative;

    @media (max-width: 768px) {
        max-width: unset;
    }
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

export const BlockEntryPlaceholder = styled.div`
    width: 316px;
    height: 89px;
`;
