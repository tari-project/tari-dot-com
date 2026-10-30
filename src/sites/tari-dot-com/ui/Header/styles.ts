'use client';

import { motion } from 'motion/react';
import styled, { css, keyframes } from 'styled-components';
import headerBgImage from './images/header-bg.png';

const darkToLightAnimation = keyframes`
  0% {
    clip-path: inset(0 0 0% 0);
  }
  100% {
    clip-path: inset(0 0 100% 0);
  }
`;

const lightToDarkAnimation = keyframes`
  0% {
    clip-path: inset(0 0 100% 0);
  }
  100% {
    clip-path: inset(0 0 0% 0);
  }
`;

const lightFromTopAnimation = keyframes`
  0% {
    clip-path: inset(100% 0 0 0);
  }
  100% {
    clip-path: inset(0% 0 0 0);
  }
`;

const hideTopAnimation = keyframes`
  0% {
    clip-path: inset(0% 0 0 0);
  }
  100% {
    clip-path: inset(100% 0 0 0);
  }
`;

export const Wrapper = styled.div`
    width: 100%;
    padding: 20px 60px 0 60px;
    pointer-events: none;

    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: -102px;

    @media (max-width: 1090px) {
        display: none;
    }
`;

export const Holder = styled.div`
    max-width: 1151px;
    height: 82px;
    width: 100%;
    position: relative;
    border-radius: 15px;
    box-shadow: 10px 10px 75px 0px rgba(0, 0, 0, 0.35);
    background-color: #fff;

    @media (max-width: 666px) {
        height: 72px;
    }
`;

export const HeaderDark = styled(motion.div)<{ $isLightTheme: boolean; $isInitialRender?: boolean }>`
    padding: 14px 20px 14px 30px;
    pointer-events: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 82px;
    border-radius: 15px;

    color: #fff;
    background: #0c0718;
    background-image: url(${headerBgImage.src});
    background-position: center;
    background-repeat: repeat;
    background-size: contain;
    background-color: #0c0718;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;

    will-change: clip-path;

    ${({ $isLightTheme, $isInitialRender }) =>
        !$isInitialRender &&
        css`
            animation: ${$isLightTheme ? darkToLightAnimation : lightToDarkAnimation} 0.5s
                cubic-bezier(0.15, 0, 0, 0.97) forwards;
        `}

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

export const HeaderLight = styled(HeaderDark)`
    background: #fff;
    color: #0c0718;
    z-index: 8;
    clip-path: inset(100% 0 0 0);

    ${({ $isLightTheme }) => css`
        animation: ${$isLightTheme ? lightFromTopAnimation : hideTopAnimation} 0.7s cubic-bezier(0.15, 0, 0, 0.97)
            forwards;
    `}
`;

export type ThemeProps = {
    $theme: 'light' | 'dark';
    $variant: 'main' | 'ootle';
};

export const THEMES = {
    light: {
        main: {
            color: '#26764e',
            dotMain: '#0f9',
            dotHighlight: '#b0d636',
        },
        ootle: {
            color: '#5a1fd6',
            dotMain: '#813bf5',
            dotHighlight: '#5a1fd6',
        },
    },
    dark: {
        main: {
            color: '#71ee73',
            dotMain: '#0f9',
            dotHighlight: '#b0d636',
        },
        ootle: {
            color: '#a57bff',
            dotMain: '#5a1fd6',
            dotHighlight: '#813bf5',
        },
    },
} as const;

export const getPalette = ({ $theme, $variant }: ThemeProps) => THEMES[$theme][$variant];

export const pickColor = ({ $theme, $variant }: ThemeProps) => {
    return getPalette({ $theme, $variant }).color;
};
