'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 115px;
    height: 84px;
    border-radius: 23px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);

    transform: translateY(-11px);
    margin: 0 4px;
`;

export const Image = styled.img<{ $isActive: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    pointer-events: none;

    &:first-child {
        position: relative;
        visibility: ${({ $isActive }) => ($isActive ? 'visible' : 'hidden')};
    }
`;
