'use client';

import styled from 'styled-components';

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 984px;
    height: 614px;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    position: relative;

    @media (max-width: 1024px) {
        flex-direction: column;
        max-width: 90vw;
        height: auto;
        min-height: 500px;
    }
`;

export const ContentSide = styled.div`
    width: 430px;
    padding: 90px 60px;
    display: flex;
    flex-direction: column;
    gap: 28px;
    background: white;

    @media (max-width: 1024px) {
        width: 100%;
        padding: 40px 24px;
        gap: 20px;
    }
`;

export const ImageSide = styled.div`
    width: 424px;
    height: 609px;
    position: relative;
    background: #000;

    @media (max-width: 1024px) {
        width: 100%;
        height: 300px;
    }
`;

export const MinerImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`;

export const Title = styled.h1`
    color: #181918;
    font-family: 'Druk LCG', sans-serif;
    font-size: 70px;
    font-weight: 800;
    line-height: 0.89;
    text-transform: uppercase;
    margin: 0;
    height: 124px;

    @media (max-width: 1024px) {
        font-size: 36px;
        height: auto;
        line-height: 1;
    }
`;

export const Description = styled.p`
    color: #111;
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.3;
    opacity: 0.7;
    margin: 0;

    .bold {
        font-weight: 700;
    }

    @media (max-width: 1024px) {
        font-size: 14px;
    }
`;

export const EmojiSection = styled.p`
    color: white;
    font-family: var(--font-poppins), sans-serif;
    font-size: 25px;
    font-weight: 700;
    letter-spacing: 2.25px;
    line-height: 1.3;
    margin: 0;
    white-space: nowrap;

    @media (max-width: 1024px) {
        font-size: 20px;
        letter-spacing: 1px;
    }
`;

export const CTAButton = styled.button`
    background: linear-gradient(90deg, rgb(90, 99, 211) 0%, rgb(51, 66, 255) 48.5%, rgb(35, 41, 124) 100%);
    border: none;
    border-radius: 10px;
    color: white;
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    font-weight: 600;
    padding: 25px 57px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    line-height: 0.942;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(51, 66, 255, 0.4);
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: 1024px) {
        padding: 20px 40px;
        font-size: 14px;
    }
`;

export const PromoSection = styled.div`
    display: flex;
    gap: 9px;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 1024px) {
        flex-direction: column;
        gap: 12px;
    }
`;

export const PromoText = styled.p`
    color: #000;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 0.942;
    margin: 0;
    text-align: center;
    white-space: nowrap;

    .bold {
        font-weight: 800;
    }

    .regular {
        font-weight: 400;
    }

    @media (max-width: 1024px) {
        font-size: 12px;
        white-space: normal;
    }
`;

export const PromoCode = styled.div`
    background: black;
    color: white;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1.26px;
    line-height: 1.3;
    padding: 10px 20px;
    border-radius: 105px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 163px;

    @media (max-width: 1024px) {
        font-size: 12px;
        padding: 8px 16px;
        width: auto;
        min-width: 140px;
    }
`;
