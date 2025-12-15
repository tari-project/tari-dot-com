'use client';

import styled from 'styled-components';

export const ModalContent = styled.div`
    display: flex;
    width: 984px;
    height: 614px;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    position: relative;

    @media (max-width: 1100px) {
        flex-direction: column;
        width: 90vw;
        max-width: 500px;
        height: auto;
        min-height: 400px;
    }
`;

export const ContentSection = styled.div`
    width: 430px;
    padding: 89px 62px 40px 62px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: 0;
    height: 614px;
    box-sizing: border-box;

    @media (max-width: 1100px) {
        width: 100%;
        padding: 40px 30px;
        position: relative;
        height: auto;
        justify-content: flex-start;
        gap: 20px;
    }
`;

export const ImageSection = styled.div`
    width: 424px;
    height: 609px;
    position: absolute;
    right: 3px;
    top: 3px;
    overflow: hidden;
    border-radius: 0 16px 16px 0;

    @media (max-width: 1100px) {
        width: 100%;
        height: 300px;
        position: relative;
        right: auto;
        top: auto;
        border-radius: 0;
    }
`;

export const Title = styled.h1`
    font-family: 'Druk LCG', 'Arial Black', sans-serif;
    font-size: 70px;
    font-weight: 900;
    line-height: 62px;
    text-transform: uppercase;
    color: #181918;
    margin: 0;
    width: 100%;
    flex-shrink: 0;

    @media (max-width: 1100px) {
        font-size: 32px;
        line-height: 30px;
    }

    @media (max-width: 480px) {
        font-size: 24px;
        line-height: 22px;
    }
`;

export const Description = styled.p`
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.3;
    color: #111;
    opacity: 0.7;
    margin: 28px 0;

    strong {
        font-weight: 700;
    }

    @media (max-width: 1100px) {
        font-size: 14px;
        margin: 20px 0;
    }
`;

export const EmojiText = styled.p`
    font-family: var(--font-poppins), sans-serif;
    font-size: 25px;
    font-weight: 700;
    letter-spacing: 2.25px;
    line-height: 1.3;
    color: #000;
    margin: 0;

    @media (max-width: 1100px) {
        font-size: 20px;
        letter-spacing: 1px;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 13px;
    width: 100%;
`;

export const CTAButton = styled.button`
    background: linear-gradient(90deg, #5A63D3 0%, #3342FF 48.5%, #23297C 100%);
    border: none;
    border-radius: 10px;
    color: white;
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 0.942;
    padding: 25px 57px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(58, 99, 211, 0.4);
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: 1100px) {
        padding: 18px 40px;
        font-size: 14px;
    }
`;

export const PromoRow = styled.div`
    display: flex;
    gap: 9px;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 1100px) {
        justify-content: center;
        gap: 8px;
    }
`;

export const PromoText = styled.p`
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 0.942;
    color: #000;
    margin: 0;
    white-space: nowrap;

    strong {
        font-weight: 800;
    }

    @media (max-width: 1100px) {
        font-size: 12px;
        white-space: normal;
        text-align: center;
    }
`;

export const PromoCodePill = styled.div`
    background: #000;
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

    @media (max-width: 1100px) {
        font-size: 12px;
        padding: 8px 16px;
        width: 140px;
    }
`;

export const MinerImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`;
