'use client';

import styled from 'styled-components';
import headerBgImage from '@/sites/tari-dot-com/ui/Header/images/header-bg.png';

export const Wrapper = styled.div`
    background-color: #fbf7ef;
    width: 100%;
    padding: 140px 0 0 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: -102px;
`;

export const Band = styled.div`
    height: 82px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${headerBgImage.src});
    background-position: center;
    background-repeat: repeat;
    background-size: contain;
    background-color: #0c0718;

    @media (max-width: 666px) {
        height: 72px;
    }
`;

export const Holder = styled.div`
    max-width: 1300px;
    height: 82px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fbf7ef;
    text-align: center;

    @media (max-width: 666px) {
        height: 72px;
    }

    a {
        font-weight: bold;
        color: #71ee73;
    }
`;
