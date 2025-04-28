'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 14px;

    @media (max-width: 1107px) {
        justify-content: center;
    }

    @media (max-width: 768px) {
        justify-content: flex-start;
    }
`;

export const SocialIcon = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.75;
    transition: opacity 0.2s ease, transform 0.2s ease;

    svg {
        height: 20px;
    }

    &:hover {
        opacity: 1;
        transform: scale(1.1);
    }
`;
