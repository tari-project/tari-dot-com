'use client';

import { motion } from 'motion/react';
import styled from 'styled-components';
import headerBgImage from './images/header-bg.png';

export const Wrapper = styled.div`
    width: 100%;
    padding: 20px 60px 0 60px;
    pointer-events: none;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1000px) {
        padding: 20px 20px 0 20px;
    }

    @media (max-width: 666px) {
        padding: 11px 8px 0 8px;
    }
`;

const BaseHeader = styled(motion.div)`
    padding: 14px 20px 14px 30px;
    pointer-events: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 82px;
    max-width: 1151px;

    border-radius: 15px;
    box-shadow: 10px 10px 75px 0px rgba(0, 0, 0, 0.35);

    .tari-logo {
        width: 121px;
    }

    @media (max-width: 1000px) {
        .tari-logo {
            width: 100px;
        }
    }

    @media (max-width: 666px) {
        height: 72px;
        padding: 23px 28px;

        .tari-logo {
            width: 80px;
        }
    }
`;

export const HeaderDark = styled(BaseHeader)`
    color: #fff;
    background: #0c0718;
    background-image: url(${headerBgImage.src});
    background-position: center;
    background-repeat: repeat;
    background-size: contain;
    background-color: #0c0718;
`;

export const HeaderLight = styled(BaseHeader)`
    color: #0c0718;
    background: #fff;
    z-index: 9;
`;
