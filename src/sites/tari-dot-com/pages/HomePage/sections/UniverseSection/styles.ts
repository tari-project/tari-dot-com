'use client';

import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 300vh; // Exactly 3 viewport heights
    position: relative;
`;

export const StickyHolder = styled.div`
    position: sticky;
    top: 0;

    width: 100%;
    height: 100vh;
    padding: 200px 60px 70px 60px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 40px;
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

export const StageWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 200px;
`;

export const StageNumber = styled.div<{ $active: boolean }>`
    position: absolute;
    font-size: 120px;
    font-weight: bold;
    color: ${(props) => (props.$active ? '#FF6B4A' : '#333')};
    opacity: ${(props) => (props.$active ? 1 : 0)};
    transition: all 0.5s ease;
    text-align: center;
    width: 100%;
`;

export const StepsWrapper = styled.div`
    display: flex;
    gap: 20px;
    max-width: 1480px;
`;

export const Step = styled.div<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 20px;

    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.33);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 2px 4px 16px 0px rgba(248, 248, 248, 0.06) inset;
    backdrop-filter: blur(50px);

    transition: all 0.5s ease;
    opacity: 0.1;

    ${({ $active }) =>
        $active &&
        css`
            opacity: 1;
        `}
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
