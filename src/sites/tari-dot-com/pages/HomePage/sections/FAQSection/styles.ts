'use client';

import styled from 'styled-components';

export const Wrapper = styled.section`
    padding: 65px 0;
    overflow: hidden;
    width: 100%;

    @media (max-width: 666px) {
        padding: 20px 0;
    }
`;

export const Carousel = styled.div`
    overflow: hidden;
    position: relative;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
`;

export const Container = styled.div`
    display: flex;
    gap: 83px;
    padding-left: 83px;
    backface-visibility: hidden;
`;
