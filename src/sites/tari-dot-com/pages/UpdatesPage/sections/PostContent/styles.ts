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
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const PostTitle = styled.h1`
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 2rem;
`;

export const PostDate = styled.p`
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 2rem;
`;

export const PostBody = styled.div`
    line-height: 1.6;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
    }

    p {
        margin-bottom: 1rem;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    code {
        background-color: #f4f4f4;
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
    }

    pre {
        background-color: #f4f4f4;
        padding: 1rem;
        border-radius: 5px;
        overflow-x: auto;
    }
`;
