'use client';

import styled from 'styled-components';

export const Wrapper = styled.div<{ $width: number }>`
    width: ${(props) => props.$width}px;
    flex-shrink: 0;

    svg {
        width: 100%;
    }
`;
