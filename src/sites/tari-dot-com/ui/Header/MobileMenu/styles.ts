'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    display: none;

    @media (max-width: 666px) {
        display: block;
    }
`;

export const MenuTrigger = styled.button`
    width: 50px;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    transform: translateX(10px);
    cursor: pointer;
`;

export const MenuWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 80;
    background-color: #000;
    width: 100%;
    height: 100dvh;

    display: none;
`;
