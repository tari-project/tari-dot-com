'use client';

import { motion } from 'motion/react';
import styled, { css } from 'styled-components';

export const Wrapper = styled(motion.div)<{ $showGroupTwo: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    padding: 20px 0;
    overflow: hidden;
    height: 193px;

    transition: height 0.3s ease;

    ${({ $showGroupTwo }) =>
        $showGroupTwo &&
        css`
            height: 401px;
        `}
`;

export const NavLink = styled.button`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 94.2%;
    letter-spacing: -0.9px;

    padding: 15px 0;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const GroupOne = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
`;

export const GroupTwo = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
`;
