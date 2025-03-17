'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100dvh;

    display: flex;

    background-color: #e4e3ec;

    padding: 0 20px;
    padding-top: 180px;
    padding-bottom: 200px;

    @media (max-width: 1228px) {
        padding-top: 160px;
        padding-bottom: 160px;
    }
`;

export const Holder = styled.div`
    min-height: 889px;
    max-width: 867px;
    width: 100%;
    margin: auto;
`;

export const PostImage = styled.img`
    margin-bottom: 57px;
    border-radius: 20px;
    aspect-ratio: 867 / 242;

    @media (max-width: 768px) {
        margin-bottom: 40px;
    }
`;

export const PostTitle = styled.h1`
    color: #111;
    font-family: var(--font-druk), sans-serif;
    font-size: 80px;
    font-style: normal;
    font-weight: 800;
    line-height: 94.2%;
    text-transform: uppercase;
    margin: 0;
    padding: 0;

    @media (max-width: 999px) {
        font-size: 60px;
    }

    @media (max-width: 807px) {
        font-size: 40px;
    }

    @media (max-width: 460px) {
        font-size: 55px;
    }
`;

export const PostDate = styled.p`
    font-size: 16px;
    color: #666;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

export const PostBody = styled.div`
    color: #111;
    font-family: var(--font-poppins), sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;

    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 40px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-top: 40px;
        margin-bottom: 20px;
    }

    p {
        margin-bottom: 20px;
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

    ul,
    ol,
    li {
        margin-bottom: 20px;
    }

    blockquote {
        padding: 20px;
        background-color: #f4f4f4;
        border-left: 5px solid #111;
        margin-bottom: 20px;
    }

    a {
        color: #111;
        text-decoration: underline;
    }

    a:hover {
        color: #111;
    }

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

export const BackButton = styled.a`
    color: #111;
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    text-decoration: none;
    display: inline-block;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;
