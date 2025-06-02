import { motion as m } from 'motion/react';
import styled, { css } from 'styled-components';

export const Wrapper = styled('div')`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: all;

    overflow: hidden;
    overflow-y: auto;

    padding: 40px;

    @media (max-height: 800px) {
        align-items: flex-start;
    }
`;

export const Cover = styled(m.div) <{ $noClose?: boolean }>`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 0;
    cursor: pointer;

    ${({ $noClose }) =>
        $noClose &&
        css`
            cursor: default;
        `}
`;

export const BoxWrapper = styled(m.div)`
    width: 100%;
    max-width: 481px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-shrink: 0;
    gap: 20px;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 74px 0 rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 1;
    background-color: #fff;
`;

export const TopButton = styled('button')`
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;

    transition: transform 0.2s ease;
    height: 31px;

    &:hover {
        transform: scale(1.1);
    }
`;

export const TopWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const Title = styled('div')`
    font-family: Poppins, sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 31px;
`;
