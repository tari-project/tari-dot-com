'use client';

import styled from 'styled-components';

export const Wrapper = styled.div<{ $color: string }>`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;

    svg {
        path {
            fill: ${({ $color }) => $color};
        }
    }
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
