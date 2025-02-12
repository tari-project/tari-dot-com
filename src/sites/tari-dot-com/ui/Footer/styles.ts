'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled.footer`
    padding: 80px 80px;

    font-family: var(--font-alliance), sans-serif;
`;

export const Holder = styled.div`
    display: flex;
    justify-content: space-between;

    max-width: 1729px;
    margin: 0 auto;
    width: 100%;

    gap: 60px;
`;

export const LogoColumn = styled.div``;

export const LinksWrapper = styled.div`
    display: flex;
    gap: 86px;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 193px;
`;

export const Title = styled.h3`
    color: #dfe5f2;
    font-size: 14px;
    font-style: normal;
    line-height: 140%;
`;

export const Links = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const StyledLink = styled(Link)`
    width: fit-content;
    color: #dfe5f2;
    font-size: 16px;
    font-style: normal;
    line-height: 140%;

    opacity: 0.75;
    transition: opacity 0.2s ease;
    text-decoration: none;

    &:hover {
        opacity: 1;
        text-decoration: none;
    }
`;

export const Copyright = styled.div`
    display: flex;
    align-items: flex-end;

    color: #dfe5f2;
    text-align: right;
    font-size: 12px;
    font-style: normal;
    line-height: 140%;

    opacity: 0.25;
`;

export const Divider = styled.div`
    background: #dfe5f2;
    width: 54px;
    height: 1px;
    flex-shrink: 0;

    margin: 25px 0 15px 0;
`;
