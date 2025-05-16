'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 973px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #fbf7ef;
    overflow: hidden;

    @media (max-width: 1090px) {
        min-height: auto;
    }
`;

export const Padding = styled.div`
    display: flex;
    gap: 110px;

    width: 100%;

    padding: 140px 60px 60px 60px;

    @media (max-width: 1090px) {
        min-height: auto;
        padding: 130px 20px 60px 20px;
        gap: 100px;
    }

    @media (max-width: 807px) {
        padding-top: 50px;
        padding-bottom: 60px;
    }
`;

export const Holder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80px;
    margin: 0 auto;
    position: relative;

    width: 100%;
    max-width: 1300px;

    @media (max-width: 1320px) {
        gap: 0px;
    }

    @media (max-width: 807px) {
        flex-direction: column-reverse;
        gap: 30px;
    }
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 656px;
    width: 100%;

    position: relative;
    z-index: 1;
    top: 30px;

    @media (max-width: 807px) {
        align-items: center;
    }
`;

export const EyebrowWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 807px) {
        display: none;
    }
`;

export const EyebrowText = styled.div`
    color: #111;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;

    @media (max-width: 999px) {
        font-size: 16px;
    }

    @media (max-width: 807px) {
        font-size: 14px;
    }
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Title = styled.div`
    color: #111;
    font-family: var(--font-druk), sans-serif;
    font-size: 120px;
    font-style: normal;
    font-weight: 800;
    line-height: 84.2%;
    text-transform: uppercase;

    @media (max-width: 1181px) {
        font-size: 100px;
    }

    @media (max-width: 999px) {
        font-size: 80px;
    }

    @media (max-width: 807px) {
        font-size: 60px;
    }

    @media (max-width: 460px) {
        font-size: 55px;
    }
`;

export const Text = styled.div`
    color: #111;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
    max-width: 598px;

    @media (max-width: 999px) {
        font-size: 16px;
    }

    @media (max-width: 807px) {
        font-size: 14px;
    }

    @media (max-width: 600px) {
        max-width: 300px;
    }
`;

export const Spacer = styled.div`
    width: 50%;
    @media (max-width: 807px) {
        display: none;
    }
`;

export const VideoWrapper = styled.div`
    aspect-ratio: 1 / 0.72;
    width: 100%;
    max-width: 65%;
    pointer-events: none;

    position: absolute;
    top: 50%;
    right: -10%;
    transform: translateY(-42%);
    z-index: 0;

    iframe,
    video {
        width: 100%;
        height: 100%;
        border: none;
    }

    @media (max-width: 807px) {
        position: relative;
        max-width: 100%;
        transform: translateY(0);
        right: unset;
        top: unset;
        margin-top: 60px;
        margin-bottom: -40px;
    }
`;

export const StyledIframe = styled.iframe<{ $isLoaded: boolean }>`
    width: 100%;
    height: 100%;
    border: none;
    opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
    will-change: opacity;
`;

export const StyledVideo = styled.video<{ $isLoaded: boolean }>`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease-in-out;
    opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
    will-change: opacity;
    background-color: transparent;
`;
