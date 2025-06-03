import { motion as m } from 'motion/react';
import styled, { css } from 'styled-components';

export const Wrapper = styled('div')`
    position: fixed;
    width: 100%;
    height: 100%;
    inset: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: all;
    background: white;
    overflow: hidden;
`;

export const Cover = styled(m.div) <{ $noClose?: boolean }>`
    position: fixed;
    width: 100%;
    height: 100%;
    inset: 0;

    z-index: 0;
    cursor: pointer;

    ${({ $noClose }) =>
        $noClose &&
        css`
            cursor: default;
        `}
`;

export const BoxWrapper = styled(m.div)`
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-shrink: 0;
    gap: 10px;
    border-radius: 20px;
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
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled('div')`
    font-family: Poppins, sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 31px;
`;
