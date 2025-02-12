'use client';

import styled from 'styled-components';

export const Wrapper = styled.div<{ $width: number }>`
    width: ${(props) => props.$width}px;

    svg {
        width: 100%;
    }
`;
