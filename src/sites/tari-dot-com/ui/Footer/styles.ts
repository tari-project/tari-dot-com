'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled.footer`
    padding: 80px 80px;
    color: #fff;
    font-family: var(--font-alliance), sans-serif;

    .tari-logo {
        width: 109px;
    }
`;

export const Holder = styled.div`
    display: flex;
    justify-content: space-between;

    max-width: 1604px;
    margin: 0 auto;
    width: 100%;

    gap: 60px;

    @media (max-width: 1107px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const Middle = styled.div`
    max-width: 624px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const LinksWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 86px;
    max-width: 624px;
    padding-bottom: 62px;
    flex-wrap: wrap;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
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
    transition: opacity 0.2s ease, transform 0.2s ease;
    text-decoration: none;

    &:hover {
        opacity: 1;
        text-decoration: none;
        transform: scale(1.05);
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
    max-width: 114px;
    width: 100%;

    @media (max-width: 1107px) {
        max-width: 100%;
        text-align: center;
        align-items: center;
        justify-content: center;
    }
`;

export const SocialWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 14px;
    padding-top: 26px;
    border-top: 1px solid rgba(223, 229, 242, 0.3);

    @media (max-width: 1107px) {
        justify-content: center;
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
        transform: scale(1.05);
    }
`;
