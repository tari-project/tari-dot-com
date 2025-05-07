'use client';

import styled from 'styled-components';

export const SectionHolder = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 160px 20px 70px 20px;
`;

export const InfoWrapper = styled.div`
    display: flex;
    gap: 50px;
    width: 100%;
    padding: 75px 0;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
    }

    @media (min-width: 769px) {
        flex-direction: row;
        & > * {
            flex: 1 1 50%;
        }
    }
`;

export const Text = styled.p`
    color: #dfe5f2;
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
`;

export const TextInner = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;

export const UniverseImageHolder = styled.div``;

export const UniverseImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

export const DownloadLink = styled.a`
    width: fit-content;
    color: #fff;

    &:hover {
        text-decoration: underline;
    }
`;

export const GithubLink = styled.button`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    background-color: rgba(0255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.2);
    display: flex;
    padding: 10px 30px 10px 10px;
    align-items: center;
    gap: 16px;
    border-radius: 40px;
    width: fit-content;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.4);
        cursor: pointer;
    }
`;
