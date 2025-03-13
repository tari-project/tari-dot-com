'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    width: 100%;
    gap: 40px;
`;

export const NavLink = styled(Link)`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: -0.85px;
`;
