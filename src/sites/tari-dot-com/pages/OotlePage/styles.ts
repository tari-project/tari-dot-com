'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    overflow: hidden;
    background-color: #e4e3ec;
    position: relative;
    z-index: 0;

    a[target='_blank']::after {
        content: ' ↗';
        font-size: 0.8em;
        opacity: 0.7;
    }
`;

export const Band = styled.div`
    background-color: #0c0718;
    color: #fbf7ef;
    text-align: center;
    height: 82px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 500;

    a {
        font-weight: bold;
        color: #813bf5;
        margin: 0 2px;
        pointer-events: auto;
    }

    @media (max-width: 666px) {
        height: 72px;
        font-size: 12px;
        padding: 0 8px;
    }
`;

export const BandText = styled.span`
    display: inline;
    pointer-events: auto;
    line-height: 1.4;
`;

export const BandFill = styled.div`
    background-color: #e4e3ec;
    width: 100%;
    padding: 140px 0 0 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -102px;
    position: relative;
    z-index: 100;
`;

export const Hero = styled.div`
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    overflow: hidden;
`;

export const HeroGlow = styled.div`
    position: absolute;
    inset: 0;
    background:
        radial-gradient(1100px 700px at 78% 30%, rgba(129, 59, 245, 0.16), transparent 60%),
        radial-gradient(800px 600px at 15% 85%, rgba(129, 59, 245, 0.1), transparent 55%);
`;

export const HeroGrid = styled.div`
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(12, 7, 24, 0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(12, 7, 24, 0.045) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 75%);
`;

export const HeroInner = styled.div`
    position: relative;
    z-index: 5;
    max-width: 1300px;
    width: 100%;
    margin: 0 auto;
    padding: 160px 40px 70px;
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 48px;
    align-items: center;

    @media (max-width: 980px) {
        grid-template-columns: 1fr;
        padding-top: 120px;
    }
`;

export const Eyebrow = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #0c0718;
    color: #fbf7ef;
    border-radius: 999px;
    padding: 8px 18px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 26px;
`;

export const EyebrowDot = styled.span`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #813bf5;
    animation: pulse 2s infinite;

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(129, 59, 245, 0.7);
        }
        70% {
            box-shadow: 0 0 0 12px rgba(129, 59, 245, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(129, 59, 245, 0);
        }
    }
`;

export const Headline = styled.h1`
    font-family: var(--font-druk), 'Arial Black', sans-serif;
    font-size: 120px;
    font-style: normal;
    font-weight: 800;
    line-height: 84.2%;
    text-transform: uppercase;
    color: #0c0718;
    margin-bottom: 10px;

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
        font-size: 52px;
    }

    .stroke {
        color: #0c0718;
    }

    .purple {
        color: #5a1fd6;
    }
`;

export const Kicker = styled.div`
    font-family: var(--font-druk), sans-serif;
    text-transform: uppercase;
    font-size: 32px;
    color: #0c0718;
    margin: 18px 0 14px;
    letter-spacing: 1px;

    span {
        color: #5a1fd6;
    }

    @media (max-width: 807px) {
        font-size: 24px;
    }
`;

export const Lede = styled.p`
    font-size: 18px;
    line-height: 1.65;
    color: #3a3547;
    max-width: 560px;
    font-weight: 500;

    @media (max-width: 999px) {
        font-size: 16px;
    }
    @media (max-width: 807px) {
        font-size: 14px;
    }
`;

export const CtaRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 34px;
`;

export const Button = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.4px;
    padding: 16px 30px;
    border-radius: 999px;
    text-decoration: none;
    transition:
        transform 0.15s ease,
        box-shadow 0.15s ease,
        background 0.15s ease;

    &.primary {
        background: #0c0718;
        color: #fbf7ef;

        .arrow {
            color: #813bf5;
        }

        &:hover {
            background: #1c1233;
            transform: translateY(-2px);
            box-shadow: 0 10px 26px rgba(12, 7, 24, 0.28);
        }
    }

    &.ghost {
        background: transparent;
        color: #0c0718;
        border: 2px solid #0c0718;

        &:hover {
            background: #0c0718;
            color: #fbf7ef;
            transform: translateY(-2px);
        }
    }
`;

export const CountdownCard = styled.div`
    background: #0c0718;
    border-radius: 28px;
    padding: 40px 38px;
    color: #fbf7ef;
    position: relative;
    box-shadow: 0 30px 80px rgba(12, 7, 24, 0.35);
    transform: rotate(1.2deg);
    overflow: hidden;

    @media (max-width: 480px) {
        transform: none;
        padding: 30px 24px;
    }
`;

export const CdLabel = styled.div`
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(251, 247, 239, 0.55);
    margin-bottom: 6px;
    position: relative;
    z-index: 2;
`;

export const CdDate = styled.div`
    font-family: var(--font-druk), sans-serif;
    text-transform: uppercase;
    font-size: 34px;
    color: #813bf5;
    margin-bottom: 26px;
    position: relative;
    z-index: 2;
`;

export const CdGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    position: relative;
    z-index: 2;
`;

export const CdCell = styled.div`
    background: rgba(251, 247, 239, 0.06);
    border: 1px solid rgba(251, 247, 239, 0.12);
    border-radius: 16px;
    padding: 18px 6px 14px;
    text-align: center;
`;

export const CdNum = styled.div`
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    font-size: 40px;
    line-height: 1;
    color: #fbf7ef;
    font-variant-numeric: tabular-nums;

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;

export const CdUnit = styled.div`
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(251, 247, 239, 0.5);
    margin-top: 8px;
`;

export const CdFoot = styled.div`
    margin-top: 22px;
    font-size: 13px;
    color: rgba(251, 247, 239, 0.55);
    position: relative;
    z-index: 2;
    line-height: 1.5;

    a {
        color: #813bf5;
        text-decoration: none;
        font-weight: 600;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const OrbitWrap = styled.div`
    position: absolute;
    right: -120px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    pointer-events: none;

    @media (max-width: 980px) {
        opacity: 0.28;
        right: -180px;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .spin-slow {
        transform-origin: 400px 400px;
        animation: spin 44s linear infinite;
    }
    .spin-mid {
        transform-origin: 400px 400px;
        animation: spin 28s linear infinite reverse;
    }
    .spin-fast {
        transform-origin: 400px 400px;
        animation: spin 18s linear infinite;
    }
    .hex-core {
        animation: bob 6s ease-in-out infinite;
    }

    @keyframes bob {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-14px);
        }
    }
`;

export const Marquee = styled.div`
    background: #813bf5;
    color: #0c0718;
    overflow: hidden;
    white-space: nowrap;
    padding: 14px 0;
    border-top: 3px solid #0c0718;
    border-bottom: 3px solid #0c0718;
    position: relative;
    z-index: 10;

    @keyframes scroll {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-50%);
        }
    }
`;

export const MarqueeTrack = styled.div`
    display: inline-block;
    animation: scroll 26s linear infinite;

    span {
        font-family: var(--font-druk), sans-serif;
        text-transform: uppercase;
        font-size: 22px;
        letter-spacing: 2px;
        padding: 0 34px;
    }
`;

export const Section = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 110px 40px;

    @media (max-width: 600px) {
        padding: 70px 22px;
    }
`;

export const SecTag = styled.span`
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

export const SecTitle = styled.h2`
    font-family: var(--font-druk), sans-serif;
    text-transform: uppercase;
    font-size: 62px;
    font-weight: 800;
    line-height: 0.95;
    max-width: 820px;
    margin-bottom: 22px;

    em {
        font-style: normal;
        color: #5a1fd6;
    }

    @media (max-width: 807px) {
        font-size: 42px;
    }
`;

export const SecLede = styled.p`
    font-size: 18px;
    line-height: 1.65;
    color: #3a3547;
    max-width: 640px;
    font-weight: 500;
`;

export const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
    margin-top: 60px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const Card = styled.div`
    background: #e4e3ec;
    border: 2px solid #0c0718;
    border-radius: 24px;
    padding: 32px 28px;
    position: relative;
    overflow: hidden;
    transition:
        transform 0.18s ease,
        box-shadow 0.18s ease;

    &:hover {
        transform: translateY(-6px);
        box-shadow: 8px 8px 0 #0c0718;
    }

    &.accent {
        background: #0c0718;
        color: #fbf7ef;
        border-color: #0c0718;
    }

    h3 {
        font-family: var(--font-druk), sans-serif;
        text-transform: uppercase;
        font-size: 26px;
        margin-bottom: 12px;
        letter-spacing: 0.5px;
    }

    p {
        font-size: 15px;
        line-height: 1.6;
        color: #4a4560;
        font-weight: 500;
    }

    &.accent p {
        color: rgba(251, 247, 239, 0.72);
    }
`;

export const CardIco = styled.div`
    width: 54px;
    height: 54px;
    border-radius: 14px;
    background: #813bf5;
    color: #0c0718;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;

    svg {
        color: #fbf7ef;
    }
`;

export const CardNum = styled.span`
    position: absolute;
    top: 18px;
    right: 24px;
    font-family: var(--font-druk), sans-serif;
    font-size: 56px;
    color: rgba(12, 7, 24, 0.18);
    line-height: 1;

    &.accent {
        color: rgba(251, 247, 239, 0.22);
    }
`;

export const Steps = styled.div`
    margin-top: 60px;
`;

export const Step = styled.div`
    display: grid;
    grid-template-columns: 120px 1fr auto;
    gap: 26px;
    align-items: center;
    padding: 34px 0;
    border-bottom: 2px solid rgba(12, 7, 24, 0.22);

    &:last-child {
        border-bottom: none;
    }

    h3 {
        font-family: var(--font-druk), sans-serif;
        text-transform: uppercase;
        font-size: 32px;
        margin-bottom: 6px;
    }

    p {
        color: #4a4560;
        font-size: 16px;
        line-height: 1.55;
        font-weight: 500;
    }

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
        gap: 8px;
    }
`;

export const StepBadge = styled.span`
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    font-size: 15px;
    color: #5a1fd6;
    letter-spacing: 2px;
`;

export const StepCode = styled.code`
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    background: #0c0718;
    color: #813bf5;
    padding: 10px 16px;
    border-radius: 10px;
    white-space: nowrap;
    justify-self: start;

    @media (min-width: 701px) {
        justify-self: end;
        margin-right: 40px;
    }
`;

export const Contest = styled.div`
    margin: 0 auto 110px;
    max-width: 1300px;
    background: #0c0718;
    color: #fbf7ef;
    border-radius: 32px;
    padding: 70px 60px;
    position: relative;
    overflow: hidden;
    text-align: center;

    @media (max-width: 700px) {
        padding: 50px 24px;
        margin-left: 22px;
        margin-right: 22px;
    }

    h2 {
        font-family: var(--font-druk), sans-serif;
        text-transform: uppercase;
        font-size: 62px;
        line-height: 0.95;
        margin-bottom: 16px;
        position: relative;
        z-index: 2;

        span {
            color: #813bf5;
        }
    }

    p {
        position: relative;
        z-index: 2;
        color: rgba(251, 247, 239, 0.72);
        font-size: 17px;
        max-width: 560px;
        margin: 0 auto 34px;
        line-height: 1.6;
    }
`;

export const Confetti = styled.span`
    position: absolute;
    font-family: var(--font-druk), sans-serif;
    color: rgba(129, 59, 245, 0.25);
    font-size: 30px;
    user-select: none;

    &.light {
        color: rgba(251, 247, 239, 0.12);
    }

    &.c1 {
        top: 18px;
        left: 8%;
        transform: rotate(-14deg);
    }
    &.c2 {
        top: 26%;
        right: 6%;
        transform: rotate(12deg);
    }
    &.c3 {
        bottom: 14px;
        left: 14%;
        transform: rotate(8deg);
    }
    &.c4 {
        bottom: 22%;
        right: 10%;
        transform: rotate(-8deg);
    }
`;

export const Footer = styled.div`
    padding: 46px 40px;
    text-align: center;
    font-size: 14px;
    color: #6a6580;
    font-weight: 500;

    a {
        color: #0c0718;
        font-weight: 600;
        text-decoration: none;
        margin: 0 10px;

        &:hover {
            color: #5a1fd6;
        }
    }
`;

export const BackToTop = styled.button`
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    background: #0c0718;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    box-shadow: 0 4px 16px rgba(12, 7, 24, 0.35);
    transition:
        background 0.2s ease,
        transform 0.2s ease;

    &:hover {
        background: #1c1233;
        transform: translateY(-3px);
    }

    svg {
        color: #fff;
    }
`;
