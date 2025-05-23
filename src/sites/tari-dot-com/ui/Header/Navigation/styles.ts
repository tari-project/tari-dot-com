'use client';

import { motion } from 'motion/react';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 10px;
`;

export const NavLink = styled.button<{ $active?: boolean; $theme?: 'dark' | 'light' }>`
    font-family: var(--font-poppins), sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: -0.85px;
    position: relative;
    transform: translateY(1px);

    padding: 0 20px;
    height: 43px;

    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    color: ${({ $theme }) => ($theme === 'light' ? '#000' : '#fff')};

    span {
        z-index: 1;
        transition: all 0.3s ease;
    }

    &:hover {
        text-decoration: none;
        span {
            color: ${({ $theme }) => ($theme === 'light' ? '#fff' : '#000')};
        }
    }

    &:active {
        span {
            transform: scale(0.9);
        }
    }

    ${({ $active, $theme }) =>
        $active &&
        css`
            pointer-events: none;
            span {
                color: ${$theme === 'light' ? '#fff' : '#000'};
            }
        `}
`;

export const HoverBox = styled(motion.div)<{ $theme?: 'dark' | 'light' }>`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ $theme }) => ($theme === 'light' ? '#0c0718' : '#fff')};
    border-radius: 10px;
    z-index: 0;
`;
