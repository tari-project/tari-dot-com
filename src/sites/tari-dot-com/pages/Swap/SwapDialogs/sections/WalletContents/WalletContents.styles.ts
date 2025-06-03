import styled, { keyframes } from 'styled-components';

export const ConnectedWalletWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
    padding: 10px 15px 10px 12px;
    border-radius: 60px;
    background: #fff;
    button {
        width: 50%;
    }
`;

export const StatusWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
`;

const pulse = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
`;

export const ActiveDot = styled.div`
    width: 9px;
    height: 8px;
    border-radius: 100%;
    background: #15D811;
    animation: ${pulse} 2s infinite;
`;

export const WalletContentsContainer = styled.div`
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const TokenList = styled.div`
    border-radius: 16px;
    padding: 8px 0;
    display: flex;
    flex-direction: column;
    background: #fff;
`;

export const TokenItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    transition: background-color 0.15s ease-in-out;
`;

export const TokenItemLeft = styled.div`
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
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 1.3;
    color: #212121;
`;

export const TokenSymbol = styled.span`
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 13px;
    line-height: 1.3;
    text-transform: uppercase;
    color: #8f91a1;
`;

export const TokenItemRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    font-size: 14px;
`;

export const TokenSeparator = styled.hr`
    border: none;
    height: 1px;
    background-color: #d8d9df;
    margin: 0 20px;
`;

export const WalletAddress = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 50%;
    color: black;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    line-height: 26px;
`;
