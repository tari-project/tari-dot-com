'use client';

import styled from 'styled-components';
import Link from 'next/link';

export const Wrapper = styled.article`
    width: 100%;
    padding: 40px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    display: flex;
    align-items: center;
    gap: 60px;
`;

export const ArticleInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

export const Title = styled(Link)`
    color: #000;
    font-family: var(--font-poppins), sans-serif;
    font-size: 35px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: -0.7px;
`;

export const Excerpt = styled.div`
    color: rgba(0, 0, 0, 0.7);
    font-family: var(--font-poppins), sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: -0.34px;
    max-width: 742px;
    margin-bottom: 10px;
`;

export const Tags = styled.span`
    font-weight: 700;
`;

export const Date = styled.div`
    color: rgba(0, 0, 0, 0.7);
    font-family: var(--font-poppins), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.3px;
    text-transform: uppercase;

    min-height: 15px;
    margin-bottom: 10px;
`;

export const ReadMoreButton = styled(Link)`
    color: #fff;
    font-family: var(--font-alliance), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 94.2%; /* 14.13px */
    letter-spacing: -0.75px;

    width: 113px;
    height: 43px;
    padding: 0px 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    background: #000;

    transition: all 0.3s ease;

    &:hover {
        text-decoration: none;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(1);
    }
`;

export const Thumbnail = styled(Link)<{ $image: string; $backgroundPosition: string }>`
    width: 300px;
    aspect-ratio: 300/191;
    flex-shrink: 0;
    background-image: url(${(props) => props.$image});
    background-size: cover;
    background-position: ${(props) => props.$backgroundPosition};
    background-repeat: no-repeat;
    border-radius: 15px;
    background-color: #f5f5f5;
`;
