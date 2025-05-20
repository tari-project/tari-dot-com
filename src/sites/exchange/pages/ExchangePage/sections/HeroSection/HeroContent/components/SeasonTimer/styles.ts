'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color: #161616;
    padding: 20px 20px 20px 40px;
    border-radius: 20px 0 0 0;
`;

export const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const TextContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const TitleGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const Title = styled.div`
    font-family: var(--font-poppins), sans-serif;
    font-size: 37px;
    font-style: normal;
    font-weight: 700;
    line-height: 88%;
    letter-spacing: -0.74px;
    text-transform: uppercase;

    background: linear-gradient(90deg, #ffd231 0%, #ffe37c 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const Text = styled.div`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14.7px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

export const TimerGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const TimeLeft = styled.div`
    display: flex;
    padding: 0px 11px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background: #fff;

    height: 30px;

    color: #111;
    font-family: var(--font-poppins), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

export const Label = styled.div`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

export const Image = styled.img``;
