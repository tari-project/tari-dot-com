'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 1037px;
    height: 100dvh;
    display: flex;
    background-color: #e4e3ec;
`;

export const Holder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60px;
    margin: 0 auto;
`;

export const MainImage = styled.img`
    width: 50%;
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 629px;
    width: 100%;
`;

export const EyebrowWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const EyebrowText = styled.div`
    color: #111;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
`;

export const EyebrowPill = styled.div`
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;

    border-radius: 50px;
    background: linear-gradient(0deg, #111 0%, #111 100%), #fff;

    height: 39px;
    padding: 0px 18px;

    display: flex;
    align-items: center;
    justify-content: center;
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
    max-width: 622px;
`;

export const Text = styled.div`
    color: #111;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
`;
