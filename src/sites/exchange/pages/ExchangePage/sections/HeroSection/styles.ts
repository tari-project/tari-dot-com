'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100dvh;
    position: relative;
    max-height: 800px;
    max-width: 1920px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const MiddleWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 60px;

    margin: 0 auto;

    position: relative;
    z-index: 1;

    padding: 40px;
`;

export const TopBorder = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 8%;

    svg {
        width: 100%;
    }
`;

export const LeftBorder = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding: 2% 0;

    svg {
        width: 100%;
        height: 100%;
    }
`;

export const BottomBorder = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 4%;

    svg {
        width: 100%;
        height: 100%;
    }
`;

export const RightBorder = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    padding: 2% 0;

    svg {
        width: 100%;
        height: 100%;
    }
`;
