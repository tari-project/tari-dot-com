'use client';

import styled from 'styled-components';

export const TopBorderWrapper = styled.div`
    width: 105%;
    height: 14%;
    flex-shrink: 0;

    svg {
        width: 110%;
        height: 100%;
        flex-shrink: 0;
    }

    @media (max-width: 1400px) {
        height: 10%;
    }

    @media (max-width: 980px) {
        height: 10%;

        svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4%;
        }
    }
`;

export const BottomBorderWrapper = styled.div`
    width: 105%;
    height: 14%;
    flex-shrink: 0;

    svg {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 1400px) {
        height: 10%;
    }

    @media (max-width: 980px) {
        height: 6%;
    }
`;

export const LeftBorderWrapper = styled.div`
    width: 7%;
    flex-shrink: 0;

    svg {
        height: 100%;
    }

    @media (max-width: 1400px) {
        width: 5%;
    }

    @media (max-width: 980px) {
        display: none;
    }
`;

export const RightBorderWrapper = styled.div`
    flex-shrink: 0;
    width: 7%;

    svg {
        height: 100%;
    }

    @media (max-width: 1400px) {
        width: 5%;
    }

    @media (max-width: 980px) {
        display: none;
    }
`;
