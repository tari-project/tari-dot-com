'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 50px;

    @media (max-width: 1000px) {
        gap: 30px;
    }

    @media (max-width: 666px) {
        display: none;
    }
`;

export const NavLink = styled(Link)`
    color: #fff;
    font-family: var(--font-alliance), sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 94.2%;
    letter-spacing: -0.85px;

    @media (max-width: 1000px) {
        font-size: 15px;
    }
`;
