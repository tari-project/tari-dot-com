'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    background-color: #e4e3ec;
    padding-top: 40px;

    @media (max-width: 1158px) {
        padding-top: 0px;
    }

    @media (max-width: 666px) {
        padding-top: 60px;
    }
`;
