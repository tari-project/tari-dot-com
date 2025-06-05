'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 94px;

    padding: 200px 60px 200px 60px;

    @media (max-width: 1266px) {
        padding: 160px 40px 160px 40px;
        gap: 60px;
    }

    @media (max-width: 660px) {
        padding: 100px 20px 100px 20px;
        gap: 40px;
    }
`;

export const Holder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    max-width: 1559px;
    width: 100%;
    position: relative;
    z-index: 1;
    margin: 0 auto;
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;

    @media (max-width: 660px) {
        gap: 10px;
    }
`;

export const StepsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    width: 100%;

    @media (max-width: 1266px) {
        flex-direction: column;
        gap: 20px;
    }

    @media (max-width: 660px) {
        flex-direction: column;
        gap: 20px;
    }
`;

export const Step = styled.div`
    position: relative;
`;

export const StepInside = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;
    border-radius: 20px;
    overflow: hidden;

    border: 1px solid #2b2b2b;
`;

export const StepTitle = styled.div`
    color: #fff;
    font-family: var(--font-druk-wide), sans-serif;
    font-size: 35px;
    font-style: normal;
    font-weight: 800;
    line-height: 102%;
    letter-spacing: 0.35px;
    text-transform: uppercase;

    @media (max-width: 1628px) {
        font-size: 30px;
    }
`;

export const StepTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 30px;

    position: absolute;
    bottom: 40px;
    left: 40px;

    @media (max-width: 1628px) {
        gap: 20px;

        bottom: 30px;
        left: 20px;
    }
`;

export const BgImage = styled.img`
    width: 100%;
    object-fit: cover;
    pointer-events: none;
`;

export const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;

    padding: 0 40px;

    position: absolute;
    top: 44%;
    left: 0;
    right: 0;

    @media (max-width: 1545px) {
        top: 40%;
        padding: 0 20px;
    }
`;

export const FieldBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

    border-radius: 32.701px;
    background: rgba(249, 249, 249, 0.2);
    box-shadow: 0px 0px 152.7px 0px rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(12px);

    padding: 24px 32px;

    @media (max-width: 1545px) {
        padding: 16px 24px;
    }
`;

export const FieldTitle = styled.div`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.48px;

    @media (max-width: 1545px) {
        font-size: 14px;
    }
`;

export const FieldInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 5px;
`;

export const Emojis = styled.div`
    color: #fff;
    font-family: var(--font-druk), sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
`;

export const LogoImage = styled.img`
    width: 150px;
    height: 150px;

    position: absolute;
    top: 48px;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 1545px) {
        width: 100px;
        height: 100px;
    }
`;

export const StepPill = styled.div<{ $color: string }>`
    color: #111;
    font-family: var(--font-poppins), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    border-radius: 100px;
    background: ${({ $color }) => $color};

    padding: 0px 11px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StepRowWrapper = styled(StepTitleWrapper)`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: row;
    gap: 20px;

    ${StepTitle} {
        max-width: 250px;
    }
`;
