'use client';

import styled from 'styled-components';

export const TopBorderWrapper = styled.div`
    width: 100%;
    flex-shrink: 0;

    svg {
        width: 100%;
        height: 100%;
    }
`;

export const LeftBorderWrapper = styled.div`
    height: 100dvh;
    width: 7%;
    flex-shrink: 0;

    svg {
        height: 100%;
    }
`;

export const BottomBorderWrapper = styled.div`
    width: 100%;
    flex-shrink: 0;

    svg {
        width: 100%;
    }
`;

export const RightBorderWrapper = styled.div`
    height: 100dvh;
    flex-shrink: 0;
    width: 7%;

    svg {
        height: 100%;
    }
`;
