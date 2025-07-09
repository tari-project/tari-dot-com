'use client';

import { css, createGlobalStyle } from 'styled-components';
import { reset } from './reset';

const styles = css`
    body {
        font-family:
            var(--font-poppins), 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        color: #000;
        background-color: #e4e3ec;
        position: relative;
        overflow-x: hidden;
        overflow-y: scroll;

        @media (max-width: 768px) {
            overscroll-behavior: none;
        }
    }
`;

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${styles}
`;

export default GlobalStyles;
