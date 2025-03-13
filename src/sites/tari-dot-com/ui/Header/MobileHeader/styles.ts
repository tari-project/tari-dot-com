'use client';

import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import headerBgImage from '../images/header-bg.png';

export const Wrapper = styled(motion.div)<{ $open: boolean }>`
    width: 100%;
    pointer-events: none;

    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;

    display: none;

    padding: 11px 8px 0 8px;
    margin-bottom: -92px;

    @media (max-width: 1090px) {
        display: flex;
    }

    ${({ $open }) =>
        $open &&
        css`
            width: 100%;
            height: 100dvh;
        `};
`;

export const Inside = styled.div`
    position: relative;
    width: 100%;
`;

export const HeaderTop = styled(motion.div)<{ $open: boolean }>`
    padding: 14px 20px 14px 30px;
    pointer-events: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 65px;

    color: #fff;

    position: relative;
    z-index: 9;

    border-radius: 15px;
    box-shadow: 10px 10px 75px 0px rgba(0, 0, 0, 0.35);
    background: #0c0718;
    background-image: url(${headerBgImage.src});
    background-repeat: repeat;
    background-color: #0c0718;

    .tari-logo {
        width: 80px;
    }

    ${({ $open }) =>
        $open &&
        css`
            box-shadow: none;
        `};
`;

export const Menu = styled(motion.div)`
    box-shadow: 10px 10px 75px 0px rgba(0, 0, 0, 0.35);
    background: #0c0718;
    background-image: url(${headerBgImage.src});
    background-repeat: repeat;
    background-color: #0c0718;
    width: 100%;
    height: 100dvh;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 98;

    padding: 30px;
    padding-top: 100px;
`;

export const MenuHolder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    max-width: 450px;
    margin: 0 auto;
`;

export const SocialLinks = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    padding-top: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
`;
