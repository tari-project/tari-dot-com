import styled from 'styled-components';
import { m } from 'motion/react';

export const ModalContent = styled(m.div)`
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

export const TokenList = styled.div`
    overflow-y: auto;
    border-radius: 8px;
    padding: 8px;
    background: ${({ theme }) => theme.palette.background.paper};
    border-radius: 25px;
`;

export const TokenItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 8px;
    cursor: pointer;
    border-bottom: 1px solid #d8d9df;
    transition: opacity 0.2s ease-in-out;
    &:last-child {
        border-bottom: none;
    }
    &:hover {
        opacity: 0.5;
    }
`;

export const TokenInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const TokenDetails = styled.div`
    display: flex;
    flex-direction: column;
    .name {
        font-weight: 500;
    }
    .symbol {
        font-size: 0.875rem;
        color: ${({ theme }) => theme.palette.text.secondary || '#8f91a1'};
    }
`;

export const TokenValue = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .usd {
        font-weight: 500;
    }
    .balance {
        font-size: 0.875rem;
        color: ${({ theme }) => theme.palette.text.secondary};
        border-radius: 100px;
        background: ${({ theme }) => theme.palette.background.accent};
        border: 1px solid ${({ theme }) => theme.palette.divider};
        padding: 2px 6px;
        margin-top: 4px;
    }
`;
