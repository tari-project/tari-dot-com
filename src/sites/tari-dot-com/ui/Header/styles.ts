'use client';

import { motion } from 'motion/react';
import styled from 'styled-components';
import headerBgImage from './images/header-bg.png';

export const Wrapper = styled.div``;

const BaseHeader = styled(motion.div)`
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;

    padding: 14px 20px 14px 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-radius: 15px;

    width: 100%;
    height: 82px;
    max-width: 1151px;

    border-radius: 15px;
    box-shadow: 10px 10px 75px 0px rgba(0, 0, 0, 0.35);
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
