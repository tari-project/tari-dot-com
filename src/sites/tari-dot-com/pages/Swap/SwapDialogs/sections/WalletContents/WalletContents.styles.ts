import styled from 'styled-components';

export const ConnectedWalletWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 15px 10px 12px;
    border-radius: 60px;
    background: ${({ theme }) => theme.palette.background.primary};
    padding: 0 10px;
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
    // background: ${({ theme }) => theme.palette.background.paper};
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
`;

export const TokenSeparator = styled.hr`
    border: none;
    height: 1px;
    background-color: ${({ theme }) => theme.palette.divider};
    margin: 0 5px;
`;

export const WalletAddress = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: fit-content;
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 14px;
    line-height: 26px;
    background: ${({ theme }) => theme.palette.background.main};
    padding: 5px 10px;
    border-radius: 10px;
`;
