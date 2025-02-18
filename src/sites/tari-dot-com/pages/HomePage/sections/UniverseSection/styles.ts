'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100dvh;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    gap: 40px;
    padding: 155px 60px 70px 60px;

    position: relative;
`;

export const TextWrapper = styled.div`
    max-width: 913px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

export const Title = styled.div`
    color: #dfe5f2;
    text-align: center;
    font-family: var(--font-druk), sans-serif;
    font-size: 100px;
    font-style: normal;
    font-weight: 800;
    line-height: 94.2%;
    text-transform: uppercase;
`;

export const Text = styled.div`
    max-width: 701px;
    color: #dfe5f2;
    text-align: center;
    font-family: var(--font-poppins), sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
`;

export const StageWrapper = styled.div``;

export const OuterGlow = styled.div``;

export const TariIcon = styled.div``;

export const StepsWrapper = styled.div`
    display: flex;
    gap: 20px;
    max-width: 1480px;
`;

export const Step = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 20px;

    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.33);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 2px 4px 16px 0px rgba(248, 248, 248, 0.06) inset;
    backdrop-filter: blur(50px);
`;

export const StepIcon = styled.img`
    width: 90px;
    height: 90px;
    flex-shrink: 0;
`;

export const TextInner = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StepTitle = styled.div`
    color: #fff;
    font-family: var(--font-druk), sans-serif;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
    text-transform: uppercase;
`;

export const StepText = styled.div`
    color: rgba(222, 228, 241, 0.6);
    font-family: var(--font-poppins), sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
    max-width: 282px;
`;
