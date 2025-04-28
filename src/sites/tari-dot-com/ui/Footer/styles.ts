'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled.footer`
    padding: 80px 80px;
    color: #fff;
    font-family: var(--font-poppins), sans-serif;

    .tari-logo {
        width: 109px;
    }

    @media (max-width: 1107px) {
        padding: 80px 50px;
    }

    @media (max-width: 768px) {
        padding: 80px 30px;
    }
`;

export const Holder = styled.div`
    display: flex;
    justify-content: space-between;

    max-width: 1604px;
    margin: 0 auto;
    width: 100%;

    gap: 60px;
    position: relative;

    @media (max-width: 1107px) {
        flex-direction: column;
        align-items: center;
    }

    @media (max-width: 768px) {
        align-items: flex-start;
    }
`;

export const Middle = styled.div`
    max-width: 643px;
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

    @media (max-width: 1107px) {
        gap: 40px;
    }

    @media (max-width: 768px) {
        padding-bottom: 40px;
        justify-content: flex-start;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;

    @media (max-width: 1107px) {
        gap: 20px;
    }

    @media (max-width: 768px) {
        width: 40%;
        min-width: 210px;
    }
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

export const RightSide = styled.div`
    display: flex;
    align-items: flex-end;
    transform: translateY(-125px);
    height: 452px;

    @media (max-width: 1107px) {
        height: auto;
        transform: unset;
    }
`;

export const Copyright = styled.div`
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;

    color: rgba(255, 255, 255, 0.5);
    text-align: right;
    font-size: 12px;
    font-style: normal;
    line-height: 140%;

    a {
        &:hover {
            text-decoration: underline;
            color: #fff;
        }
    }

    @media (max-width: 360px) {
        text-align: left;
        flex-direction: column-reverse;
        align-items: flex-start;
    }
`;

export const TariElementImage = styled.img`
    @media (max-width: 1107px) {
        display: none;
    }
`;

export const BottomWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;

    width: 100%;

    padding-top: 26px;
    border-top: 1px solid rgba(255, 255, 255, 0.3);

    @media (max-width: 650px) {
        flex-direction: column-reverse;
        align-items: flex-start;
        gap: 20px;
    }
`;

export const LegalLinks = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 10px;

    @media (max-width: 360px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 0;
        padding-bottom: 10px;
    }
`;
