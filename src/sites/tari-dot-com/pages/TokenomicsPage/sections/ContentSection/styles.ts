'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100dvh;

    display: flex;

    background-color: #e4e3ec;

    padding: 0 20px;
    padding-top: 200px;
    padding-bottom: 200px;
`;

export const Holder = styled.div`
    min-height: 889px;
    max-width: 867px;
    width: 100%;
    margin: auto;

    font-size: 16px;
    font-weight: 400;
    line-height: 160%;
    font-family: var(--font-poppins), sans-serif;

    h1 {
        margin-bottom: 4px;
    }

    h2 {
        font-weight: 600;
        color: rgba(0, 0, 0, 0.5);
    }

    p,
    ul,
    ol {
        margin-bottom: 24px;
    }

    a {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        font-size: 12px;

        p {
            margin-bottom: 20px;
        }
    }
`;

export const Image = styled.img`
    width: 100%;
    margin-bottom: 40px;
`;
