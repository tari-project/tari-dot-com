'use client';

import styled from 'styled-components';

export const Wrapper = styled.button`
    width: fit-content;
    height: 60px;
    padding: 20px 6px 20px 30px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 70px;
    background: linear-gradient(90deg, #5a63d3 0%, #3342ff 48.5%, #23297c 100%),
        linear-gradient(0deg, #813bf5 0%, #813bf5 100%), #0f0e14;
`;

export const Text = styled.div`
    color: #fff;
    font-family: var(--font-alliance), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 94.2%;
    letter-spacing: -0.75px;
`;

export const Icons = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;

    padding: 6px 10px;

    border-radius: 50px;
    background: rgba(0, 0, 0, 0.2);
`;
