'use client';

import styled from 'styled-components';
import { motion } from 'motion/react';

export const ModalOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
`;

export const ModalWrapper = styled.div`
    position: relative;
`;

export const ModalBox = styled(motion.div)`
    position: relative;
    display: flex;
    width: 984px;
    height: 614px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);

    @media (max-width: 1024px) {
        flex-direction: column;
        width: 90vw;
        max-width: 500px;
        height: auto;
        min-height: 500px;
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 18px;
    z-index: 10;
    right: 18px;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.2s ease;
    color: #333;
    padding: 0;
    margin: 0;
    background: white;
    box-sizing: border-box;

    /* Force centering */
    text-align: center;
    vertical-align: middle;

    &:hover {
        transform: scale(1.05);
    }

    &:focus {
        outline: none;
    }

    svg {
        width: 18px;
        height: 18px;
        display: block;
        margin: auto;
    }
`;

export const ContentArea = styled.div`
    width: 560px;
    padding: 89px 62px 92px 62px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 1024px) {
        width: 100%;
        padding: 40px 30px 30px 30px;
        gap: 24px;
        justify-content: flex-start;
    }
`;

export const ImageArea = styled.div`
    width: 424px;
    height: 609px;
    position: relative;
    background: #1a1a1a;
    margin: 3px 3px 3px 0;
    border-radius: 0 16px 16px 0;
    overflow: hidden;

    @media (max-width: 1024px) {
        display: none;
    }
`;

export const Title = styled.h1`
    font-family: var(--font-druk), 'Arial Black', 'Helvetica', sans-serif;
    font-size: 70px;
    font-weight: 800;
    line-height: 62px;
    text-transform: uppercase;
    color: #181918;
    margin: 0 0 20px 0;

    @media (max-width: 1024px) {
        font-size: 54px;
        line-height: 48px;
        margin: 0 0 16px 0;
    }

    @media (max-width: 480px) {
        font-size: 48px;
        line-height: 42px;
        margin: 0 0 12px 0;
    }
`;

export const Description = styled.p`
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 20.8px;
    color: rgba(17, 17, 17, 0.7);
    margin: 0 0 16px 0;

    strong {
        font-weight: 700;
        color: #111;
    }

    @media (max-width: 1024px) {
        font-size: 14px;
        line-height: 18px;
        margin: 0 0 12px 0;
    }
`;

export const EmojiText = styled.p`
    font-family: var(--font-poppins), sans-serif;
    font-size: 25px;
    font-weight: 700;
    letter-spacing: 2.25px;
    color: #000;
    margin: 0;

    @media (max-width: 1024px) {
        font-size: 20px;
        letter-spacing: 1px;
    }
`;

export const CTAButton = styled.button`
    background: linear-gradient(90deg, #5a63d3 0%, #3342ff 48.5%, #23297c 100%);
    border: none;
    border-radius: 10px;
    color: white;
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 15.072px;
    padding: 25px 57px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 13px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(58, 99, 211, 0.5);
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: 1024px) {
        padding: 18px 40px;
        font-size: 14px;
    }
`;

export const PromoSection = styled.div`
    display: flex;
    gap: 9px;
    align-items: center;

    @media (max-width: 1024px) {
        flex-direction: column;
        gap: 12px;
        text-align: center;
    }
`;

export const PromoText = styled.p`
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 13.188px;
    color: #000;
    margin: 0;
    white-space: nowrap;

    strong {
        font-weight: 800;
    }

    @media (max-width: 1024px) {
        font-size: 12px;
        white-space: normal;
    }
`;

export const PromoCodeBadge = styled.div`
    background: #000;
    color: white;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1.26px;
    line-height: 18.2px;
    padding: 10px 20px;
    border-radius: 105px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 163px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
        background: #333;
        transform: translateY(-1px);
    }

    @media (max-width: 1024px) {
        font-size: 12px;
        padding: 8px 16px;
        min-width: 140px;
    }
`;

export const CopiedPopup = styled.div<{ $visible: boolean }>`
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    font-family: var(--font-poppins), sans-serif;
    font-size: 12px;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 20px;
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 100;
    white-space: nowrap;
`;

export const ASICImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`;
