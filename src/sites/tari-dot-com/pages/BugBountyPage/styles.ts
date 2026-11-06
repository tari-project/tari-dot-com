'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100dvh;
    display: flex;
    background-color: #e4e3ec;
    position: relative;
    z-index: 0;
    padding: 0 20px;
    padding-top: 200px;
    padding-bottom: 200px;

    @media (max-width: 768px) {
        padding-top: 140px;
        padding-bottom: 60px;
    }

    a[target='_blank']::after {
        content: '↗';
        font-size: 0.8em;
        margin-left: 2px;
        text-decoration: none;
    }
`;

export const Section = styled.div`
    max-width: 1151px;
    width: 100%;
    margin: 0 auto;
`;

export const Heading = styled.h2`
    font-family: var(--font-druk), sans-serif;
    text-transform: uppercase;
    font-size: 48px;
    color: #0c0718;
    margin-top: 48px;
    margin-bottom: 24px;

    &:first-child {
        margin-top: 0;
    }

    @media (max-width: 768px) {
        font-size: 32px;
    }
`;

export const Body = styled.p`
    font-size: 16px;
    line-height: 160%;
    font-family: var(--font-poppins), sans-serif;
    color: #0c0718;
    margin-bottom: 24px;

    @media (max-width: 768px) {
        font-size: 14px;
        margin-bottom: 20px;
    }
`;

export const List = styled.ul`
    font-size: 16px;
    line-height: 160%;
    font-family: var(--font-poppins), sans-serif;
    color: #0c0718;
    margin-bottom: 24px;
    padding-left: 24px;

    @media (max-width: 768px) {
        font-size: 14px;
        margin-bottom: 20px;
    }
`;

export const ListItem = styled.li`
    margin-bottom: 12px;
`;

export const ExternalLink = styled.a`
    color: #813bf5;
    text-decoration: underline;

    &:hover {
        color: #6a31d6;
    }
`;
