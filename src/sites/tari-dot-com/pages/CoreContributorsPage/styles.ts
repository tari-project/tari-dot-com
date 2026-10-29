'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100dvh;

    display: flex;
    flex-direction: column;

    background-color: #e4e3ec;

    padding: 0 20px;
    padding-top: 200px;
    padding-bottom: 200px;

    @media (max-width: 768px) {
        padding-top: 140px;
        padding-bottom: 60px;
    }
`;

export const Holder = styled.div`
    min-height: 600px;
    max-width: 1100px;
    width: 100%;
    margin: auto;

    font-size: 16px;
    font-weight: 400;
    line-height: 160%;
    font-family: var(--font-poppins), sans-serif;

    h1 {
        margin-bottom: 4px;
        font-size: 48px;
        font-weight: 700;
        line-height: 120%;
        color: #0c0718;

        @media (max-width: 768px) {
            font-size: 32px;
        }
    }

    h2 {
        font-weight: 600;
        color: rgba(0, 0, 0, 0.5);
        margin-bottom: 40px;
    }

    h3 {
        font-size: 20px;
        font-weight: 600;
        color: #0c0718;
        margin-bottom: 16px;
        margin-top: 32px;
    }

    p,
    ul,
    ol {
        margin-bottom: 24px;
    }

    a {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        font-size: 14px;

        p {
            margin-bottom: 20px;
        }
    }
`;

export const Section = styled.section`
    margin-bottom: 80px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const MembersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 40px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`;

export const MemberCard = styled.div`
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    padding: 28px;

    display: flex;
    flex-direction: column;
    gap: 12px;

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    }
`;

export const MemberIcon = styled.div<{ $seed: string }>`
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(129, 59, 245, 0.15), rgba(129, 59, 245, 0.05));
    border: 1px solid rgba(129, 59, 245, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 28px;
        height: 28px;
    }
`;

export const MemberName = styled.h4`
    font-size: 18px;
    font-weight: 600;
    color: #0c0718;
    margin: 0;
`;

export const MemberRole = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: #813bf5;
    margin: 0;
`;

export const MemberBio = styled.p`
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    color: rgba(0, 0, 0, 0.7);
    margin: 0;
`;

export const CategoryTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #0c0718;
    margin-top: 32px;
    margin-bottom: 12px;
`;

export const Note = styled.div`
    background: rgba(129, 59, 245, 0.08);
    border: 1px solid rgba(129, 59, 245, 0.2);
    border-radius: 12px;
    padding: 20px 24px;
    margin-top: 24px;

    p {
        margin: 0;
        font-size: 14px;
        line-height: 150%;
        color: rgba(0, 0, 0, 0.7);
    }

    strong {
        color: #0c0718;
    }
`;

export const ExternalLink = styled.a`
    color: #813bf5;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
