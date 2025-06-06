import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ConnectedWalletWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 20px;
    border-radius: 60px;
    background: ${({ theme }) => theme.palette.background.accent};
    button {
        width: fit-content;
    }
`;

export const StatusWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
`;

export const WalletContentsContainer = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const TokenList = styled.div`
    border-radius: 16px;
    padding: 8px 0;
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.mode === 'dark' ? theme.palette.background.accent : theme.palette.background.paper};
`;

export const TokenItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px 10px 10px;
    transition: background-color 0.15s ease-in-out;
`;

export const TokenItemLeft = styled.div`
    color: ${({ theme }) => theme.palette.text.primary};
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const TokenIconWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

export const TokenInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const TokenName = styled.span`
    font-weight: 600;
    font-size: 16px;
    line-height: 1.3;
    color: ${({ theme }) => theme.palette.text.primary};
`;

export const TokenSymbol = styled.span`
    font-weight: 500;
    font-size: 13px;
    line-height: 1.3;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.text.secondary};
`;

export const TokenItemRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    font-size: 14px;
    .balance {
        font-size: 12px;
        font-weight: ${({ theme }) => theme.mode === 'dark' ? '500' : '700'};
        color: ${({ theme }) => theme.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary};
        border-radius: 100px;
        background: ${({ theme }) => theme.palette.background.accent};
        border: 1px solid ${({ theme }) => theme.palette.divider};
        padding: 2px 8px;
        margin-top: 4px;
    }

    .usd {
        font-size: 14px;
        padding-right: 4px;
    }
`;

export const TokenSeparator = styled.hr`
    border: none;
    height: 1px;
    background-color: ${({ theme }) => theme.palette.divider};
    margin: 0 5px;
`;

export const WalletAddress = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: fit-content;
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 14px;
    line-height: 26px;
    transition: all 0.15s ease-in-out;
    position: relative;
    transform: translateZ(0);

    .address-content {
        display: flex;
        align-items: center;
        transition: opacity 0.15s ease-in-out;
    }

    &:hover .address-content {
        opacity: 0.7;
    }
`;

export const CopyText = styled(motion.div)`
    position: absolute;
    inset: -2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 26px;
    border-radius: 15px;
    background: #36C475;
    color: white;
    z-index: 1;
`;
