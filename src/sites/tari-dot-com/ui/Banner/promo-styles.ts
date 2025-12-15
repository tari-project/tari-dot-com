'use client';

import styled from 'styled-components';

export const NewBannerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 57px;
    background-image: url('/banner-bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    z-index: 99;
    cursor: pointer;

    @media (max-width: 886px) {
        height: 40px;
    }

    @media (max-width: 722px) {
        height: auto;
        min-height: 80px;
        padding: 8px 0;
        align-items: stretch;
    }

    @media (max-width: 492px) {
        min-height: 70px;
        padding: 6px 0;
    }
`;

export const BannerContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1604px;
    margin: 0 auto;
    position: relative;

    @media (max-width: 722px) {
        flex-direction: column;
        justify-content: center;
        gap: 0;
        padding: 8px 20px;
    }
`;

export const LeftSection = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    padding-left: 100px;
    position: relative;

    @media (max-width: 886px) {
        padding-left: 60px;
        gap: 15px;
    }

    @media (max-width: 722px) {
        padding-left: 0;
        justify-content: center;
        gap: 10px;
    }

    @media (max-width: 492px) {
        gap: 8px;
    }
`;

export const RightSection = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: flex-end;
    padding-right: 60px;

    @media (max-width: 886px) {
        padding-right: 40px;
        gap: 15px;
    }

    @media (max-width: 722px) {
        padding-right: 0;
        justify-content: center;
        gap: 15px;
    }

    @media (max-width: 492px) {
        gap: 10px;
        flex-direction: column;
    }
`;

export const ASICImage = styled.img`
    height: 100px;
    width: auto;
    position: absolute;
    bottom: -13.6px; /* 20% overflow on bottom */
    left: -20px;
    top: -10px;
    z-index: 1;

    @media (max-width: 1090px) {
        height: 60px;
        top: -10px;
        left: -5px;
    }

    @media (max-width: 722px) {
        height: 80px;
        top: 0px;
        left: 0px;
    }

    @media (max-width: 492px) {
        height: 36px;
        bottom: -7.2px;
        left: 10px;
        position: relative;
        bottom: auto;
    }
`;

export const MainTitle = styled.p`
    color: white;
    text-align: center;
    font-family: var(--font-poppins), sans-serif;
    font-size: 17px;
    font-weight: 700;
    line-height: 0.942;
    text-transform: uppercase;
    margin: 0;
    white-space: nowrap;
    z-index: 2;
    position: relative;

    @media (max-width: 886px) {
        font-size: 16px;
    }

    @media (max-width: 722px) {
        font-size: 22px;
        text-align: center;
        line-height: 1.1;
    }

    @media (max-width: 492px) {
        font-size: 20px;
        white-space: normal;
        text-align: center;
        line-height: 1.1;
    }
`;

export const SubText = styled.p`
    color: white;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 0.942;
    margin: 0;
    white-space: nowrap;

    @media (max-width: 950px) {
        font-size: 12px;
    }

    @media (max-width: 492px) {
        font-size: 10px;
        white-space: normal;
        text-align: center;
    }
`;

export const GoldshellText = styled.span`
    color: #ffab25;
    font-weight: 700;
`;

export const BuyButton = styled.button`
    border: 1px solid white;
    border-radius: 50px;
    background: transparent;
    color: white;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 0.942;
    padding: 12px 17px;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.8);
    }

    @media (max-width: 950px) {
        font-size: 12px;
        padding: 10px 15px;
    }

    @media (max-width: 492px) {
        font-size: 11px;
        padding: 8px 12px;
    }
`;
