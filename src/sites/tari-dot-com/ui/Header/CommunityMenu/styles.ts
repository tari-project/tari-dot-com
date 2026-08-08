'use client';

import styled from 'styled-components';

export const CommunityLinks = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(3, auto);
    grid-auto-columns: 1fr;
    align-content: start;
    gap: 5px;
    width: 100%;
`;
