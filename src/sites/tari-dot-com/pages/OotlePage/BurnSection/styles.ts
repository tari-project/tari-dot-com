'use client';

import styled, { css } from 'styled-components';

export const Section = styled.section`
    scroll-margin-top: 40px;
    position: relative;
    z-index: 1;
    max-width: 1300px;
    margin: 0 auto;
    padding: 110px 40px 0;
    color: #0c0718;
    font-family: var(--font-poppins), sans-serif;

    @media (max-width: 760px) {
        padding: 70px 18px 0;
    }
`;

export const Intro = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 48px;
    margin-bottom: 40px;

    @media (max-width: 1050px) {
        gap: 28px;
    }

    @media (max-width: 760px) {
        display: block;
    }
`;

export const Title = styled.h2`
    font-family: var(--font-druk), 'Arial Black', sans-serif;
    font-weight: 800;
    font-size: clamp(60px, 5.7vw, 82px);
    line-height: 0.98;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    margin: 0;

    em {
        color: #5a1fd6;
        font-style: normal;
    }

    @media (max-width: 760px) {
        font-size: clamp(58px, 12vw, 78px);
    }
`;

export const Lede = styled.div`
    flex: 0 1 380px;
    min-width: 0;
    padding-bottom: 3px;

    @media (max-width: 1050px) {
        flex-basis: 350px;
    }

    @media (max-width: 760px) {
        margin-top: 30px;
    }
`;

export const LaunchMessage = styled.p`
    font-size: clamp(22px, 2.2vw, 30px);
    line-height: 1.3;
    letter-spacing: -0.025em;
    margin: 0 0 12px;
    font-weight: 600;

    strong {
        color: #5a1fd6;
        font-weight: 600;
    }

    @media (max-width: 1050px) {
        font-size: 25px;
    }

    @media (max-width: 760px) {
        font-size: clamp(23px, 5.7vw, 30px);
    }
`;

export const DayOne = styled.p`
    font-size: 15px;
    line-height: 1.6;
    color: #3a3547;
    margin: 0 0 28px;
`;

export const Clock = styled.div`
    margin: -10px 0 26px;
`;

export const ClockDigits = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;

    > span {
        display: flex;
        flex-direction: column;
        gap: 3px;
        border-top: 1px solid #b8accb;
        padding-top: 9px;
    }

    b {
        font-size: 34px;
        line-height: 1.2;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        letter-spacing: -0.04em;
    }

    span span {
        font-size: 12px;
        color: #5c526c;
    }
`;

export const ClockSoon = styled.p`
    font-size: 22px;
    margin: 0;
`;

export const Primary = styled.a`
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
    padding: 19px 22px;
    background: #0c0718;
    border: 1px solid #4e3c67;
    color: #fbf7ef;
    border-radius: 8px 8px 26px 8px;
    text-decoration: none;
    box-shadow:
        0 8px 22px #29154116,
        inset 0 1px 0 #ffffff16;
    transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        transform 0.2s ease;

    .title {
        font-size: 17px;
        line-height: 1.4;
        font-weight: 600;
        letter-spacing: -0.02em;
    }

    .detail {
        font-size: 14px;
        line-height: 1.5;
        color: #d6c7ee;
    }

    &:active {
        transform: translateY(1px) scale(0.985);
    }

    @media (hover: hover) {
        &:hover {
            background: #341064;
            border-color: #7549ae;
            box-shadow:
                0 12px 28px #4a22832b,
                inset 0 1px 0 #ffffff20;
            transform: translateY(-2px);
        }
    }

    @media (max-width: 1050px) {
        padding: 16px;

        .title {
            font-size: 16px;
        }

        .detail {
            font-size: 13px;
        }
    }

    @media (max-width: 760px) {
        padding: 19px 20px;

        .title {
            font-size: 18px;
        }

        .detail {
            font-size: 14px;
        }
    }
`;

export const Stats = styled.div`
    --fire-rise: 72%;
    --fire-opacity: 0.28;
    --fire-brightness: 0.72;
    --ember-opacity: 0.12;
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border-radius: 24px;
    background: #0c0718;
    min-height: 290px;
    box-shadow: 0 16px 45px #34204a25;

    @media (max-width: 760px) {
        grid-template-columns: 1fr 1fr;
        border-radius: 20px;
    }
`;

export const FireScene = styled.div`
    position: absolute;
    inset: 0;
    z-index: 0;
    background: #110619;

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 62%;
        transform: translateY(var(--fire-rise));
        opacity: var(--fire-opacity);
        filter: saturate(0.9) brightness(var(--fire-brightness));
        mask-image: linear-gradient(transparent, #000 38%);
    }

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at 50% 115%, #ff6c26 0%, #b52e24 35%, transparent 70%);
        opacity: var(--ember-opacity);
        pointer-events: none;
    }
`;

export const FireShade = styled.div`
    position: absolute;
    inset: 0;
    background:
        linear-gradient(90deg, #0c0718d9 0%, #14081b80 45%, #0c0718c0 100%),
        linear-gradient(0deg, transparent, #0c071887);
`;

export const Stat = styled.article`
    min-width: 0;
    padding: 38px;
    color: #fbf7ef;
    position: relative;
    min-height: 290px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    z-index: 1;

    &.count::before,
    &.people::before {
        content: '';
        position: absolute;
        left: 0;
        top: 65px;
        bottom: 65px;
        width: 1px;
        background: #d3c4e23b;
    }

    @media (max-width: 1050px) {
        padding: 28px;
    }

    @media (max-width: 760px) {
        min-height: 155px;
        padding: 24px;

        &.total {
            grid-column: 1 / -1;
            min-height: 220px;
            padding-top: 34px;
        }

        &.count,
        &.people {
            border-top: 1px solid #d3c4e23b;
        }

        &.count::before {
            display: none;
        }

        &.people::before {
            top: 25px;
            bottom: 25px;
        }
    }
`;

export const Network = styled.span`
    font-size: 14px;
    color: #ddd0ef;
    margin-bottom: 13px;
`;

export const Value = styled.span<{ $loading: boolean; $long: boolean }>`
    font-family: var(--font-druk), 'Arial Black', sans-serif;
    font-weight: 800;
    font-size: clamp(70px, 8vw, 114px);
    line-height: 1;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.025em;
    display: block;
    overflow-wrap: anywhere;
    text-shadow: 0 3px 28px #06030cc0;

    ${({ $long }) =>
        $long &&
        css`
            font-size: clamp(38px, 5vw, 72px);
        `}

    .total & {
        font-size: ${({ $long }) => ($long ? 'clamp(48px, 6vw, 86px)' : 'clamp(90px, 10vw, 145px)')};
    }

    ${({ $loading }) =>
        $loading &&
        css`
            position: relative;
            color: transparent;
            text-shadow: none;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                width: min(80px, 60%);
                height: 12px;
                border-radius: 6px;
                background: #fbf7ef26;
            }
        `}

    @media (max-width: 760px) {
        font-size: ${({ $long }) => ($long ? 'clamp(38px, 11vw, 52px)' : '74px')};

        .total & {
            font-size: ${({ $long }) => ($long ? '60px' : '110px')};
        }
    }
`;

export const Label = styled.h3`
    font-size: 17px;
    line-height: 1.4;
    font-weight: 400;
    margin: 13px 0 0;
    color: #e2d6eb;

    @media (max-width: 760px) {
        font-size: 15px;
    }
`;

export const DataError = styled.p`
    font-size: 16px;
    margin-top: 24px;
`;

export const Details = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
`;

export const Secondary = styled.a`
    display: flex;
    align-items: center;
    min-height: 48px;
    font-size: 15px;
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid #9688ab;
    transition:
        color 0.2s ease,
        border-color 0.2s ease;

    @media (hover: hover) {
        &:hover {
            color: #5a1fd6;
            border-color: #5a1fd6;
        }
    }

    @media (max-width: 760px) {
        font-size: 16px;
        min-height: 44px;
    }
`;

export const Divider = styled.hr`
    margin: 110px 0 0;
    height: 14px;
    border: 0;
    border-top: 3px solid #0c0718;
    border-bottom: 3px solid #0c0718;
    background: #813bf5;

    @media (max-width: 760px) {
        margin-top: 70px;
    }
`;
