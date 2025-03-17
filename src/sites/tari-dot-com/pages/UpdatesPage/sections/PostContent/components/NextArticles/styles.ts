'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    margin-top: 80px;
    padding-top: 60px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 40px;
    }
`;

export const Card = styled.div`
    display: block;
`;

export const Image = styled.img<{ $alignLeft?: boolean }>`
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: ${(props) => (props.$alignLeft ? 'left' : 'center')};
    border-radius: 15px;
    margin-bottom: 16px;
`;

export const Title = styled.h3`
    color: #111;
    font-family: var(--font-poppins), sans-serif;
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 8px 0;
    line-height: 130%;
`;

export const Meta = styled.div`
    color: #666;
    font-family: var(--font-poppins), sans-serif;
    font-size: 12px;
    margin-bottom: 20px;
`;
