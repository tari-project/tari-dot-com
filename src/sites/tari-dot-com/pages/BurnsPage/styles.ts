'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100dvh;
    background-color: #e4e3ec;
    padding: 200px 20px 160px;

    @media (max-width: 768px) {
        padding: 140px 20px 60px;
    }
`;

export const Holder = styled.div`
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    font-family: var(--font-poppins), sans-serif;
    color: #0c0718;
`;

export const Tag = styled.span`
    display: inline-block;
    background: #0c0718;
    color: #fbf7ef;
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 7px 16px;
    border-radius: 999px;
    margin-bottom: 24px;
    font-weight: 700;
`;

export const Title = styled.h1`
    font-family: var(--font-druk), sans-serif;
    text-transform: uppercase;
    font-size: 62px;
    font-weight: 800;
    line-height: 0.95;
    margin-bottom: 22px;

    em {
        font-style: normal;
        color: #5a1fd6;
    }

    @media (max-width: 807px) {
        font-size: 44px;
    }
`;

export const Lede = styled.p`
    font-size: 18px;
    line-height: 1.65;
    color: #3a3547;
    max-width: 640px;
    font-weight: 500;
    margin-bottom: 48px;

    a {
        color: #5a1fd6;
        text-decoration: underline;
    }
`;

export const Stats = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
    margin-bottom: 64px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const Stat = styled.div`
    background: #0c0718;
    color: #fbf7ef;
    border-radius: 24px;
    padding: 32px 28px;
`;

export const StatValue = styled.div`
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    font-size: 40px;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    word-break: break-all;

    @media (max-width: 480px) {
        font-size: 28px;
    }
`;

export const StatLabel = styled.div`
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(251, 247, 239, 0.55);
    margin-top: 10px;
`;

export const SectionTitle = styled.h2`
    font-family: var(--font-druk), sans-serif;
    text-transform: uppercase;
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 18px;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;
    font-variant-numeric: tabular-nums;

    th,
    td {
        text-align: left;
        padding: 12px 10px;
        border-bottom: 1px solid rgba(12, 7, 24, 0.15);
        white-space: nowrap;
    }

    th {
        font-size: 11px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: rgba(12, 7, 24, 0.55);
        font-weight: 600;
    }

    td.mono {
        font-family: 'JetBrains Mono', monospace;
    }

    @media (max-width: 700px) {
        display: block;
        overflow-x: auto;
    }
`;

export const Status = styled.span<{ $confirmed: boolean }>`
    display: inline-block;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    background: ${({ $confirmed }) => ($confirmed ? '#5a1fd6' : 'rgba(12, 7, 24, 0.12)')};
    color: ${({ $confirmed }) => ($confirmed ? '#fbf7ef' : '#0c0718')};
`;

export const Empty = styled.p`
    color: #3a3547;
    font-size: 16px;
`;
