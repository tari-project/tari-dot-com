import { SwapDirection as SwapDirectionType } from '@/ui-shared/hooks/swap/lib/types';
import styled, { css } from 'styled-components';

export const OptionContainer = styled.div<{ $paddingBottom?: number }>`
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.palette.text.primary};
    background: ${({ theme }) => theme.palette.background.main};
    border-radius: 20px;
    padding: 20px 15px;
    height: 80px;

    ${({ $paddingBottom }) =>
        $paddingBottom &&
        css`
            padding-bottom: ${$paddingBottom}px;
        `}
`;

export const SwapOption = styled.div<{ $paddingBottom?: number }>`
    display: flex;
    flex-direction: column;
    height: 100%;

    > span {
    color: ${({ theme }) => theme.palette.text.secondary || '#8f91a1'};
        font-size: 10px;
    }
`;

export const SwapsContainer = styled.div`
    max-width: 100%;
    color: ${({ theme }) => theme.palette.text.primary};
`;

export const SwapOptionAmount = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    color: ${({ theme }) => theme.palette.text.primary};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: 500;
    font-size: 36px;
`;

export const SwapOptionCurrency = styled.div<{ $clickable?: boolean }>`
    width: 80px;
    border-radius: 60px;
    gap: 6px;
    height: 35px;
    padding-left: 6px;
    justify-content: space-between;
    padding-right: 10px;
    background: ${({ theme }) => theme.palette.background.paper};
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    border: 1px solid ${({ theme }) => theme.palette.divider};
    color: ${({ theme }) => theme.palette.text.primary};
    span {
        color: ${({ theme }) => theme.palette.text.primary};
        font-family: Alliance No.1;
        font-weight: 700;
        font-size: 12.85px;
        line-height: 100%;
        letter-spacing: -2%;
    }
    -webkit-transform: translateZ(0);
    ${({ $clickable }) =>
        $clickable &&
        css`
            cursor: pointer;
            &:hover {
                opacity: 0.8;
            }
        `}
`;

export const SwapLabel = styled.span`
    margin-bottom: 10px;
`

export const SwapDirection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1px;
    z-index: 2;
`;

export const SwapAmountInput = styled.input<{
    $error?: boolean;
    $loading?: boolean;
    $dynamicFontSize?: number; // Prop for dynamic font size
}>`
    width: 100%;
    color: ${({ theme }) => theme.palette.text.primary};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: 500;
    font-size: ${({ $dynamicFontSize }) => ($dynamicFontSize ? `${$dynamicFontSize}px` : '28px')};
    line-height: 100%;
    background: transparent;
    border: none;
    text-align: left;
    padding: 0;
    height: 40px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${({ theme }) => theme.palette.text.secondary};
    }

    ${({ $error }) =>
        $error &&
        css`
            color: #E60256;
        `}

    ${({ $loading }) =>
        $loading &&
        css`
            opacity: 0.5;
        `}
`;

export const SwapDirectionWrapper = styled.div<{ $direction: SwapDirectionType }>`
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    -webkit-transform: translateZ(0);

    transition: opacity 0.2s ease-in-out;

    &:hover {
        opacity: 0.8;
    }

    svg {
        transition: transform 0.2s ease-in-out;
    }

    width: 46px;
    height: 46px;
    border-radius: 23px;
    border-width: 4px;
    background: black;

    ${({ $direction }) =>
        $direction === 'fromXtm' &&
        css`
            svg {
                transform: rotate(180deg);
            }
        `}
`;

export const SectionHeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    align-items: center;
`;

export const BackButton = styled.button`
    border-radius: 43px;
    padding: 2px 8px;
    gap: 3px;
    border-width: 1px;
    border: 1px solid #d8d9df;

    font-family: Poppins, sans-serif;
    font-weight: 500;
    font-size: 10px;
`;

export const HeaderWrapper = styled.div`
    padding-bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
export const HeaderItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: start;
`;
export const StepHeader = styled.h3`
    font-weight: 600;
    font-size: 16px;
    margin: 0;
`;

export const CurrentStep = styled.span`
    font-weight: 600;
    font-size: 12px;
    color: ${({ theme }) => theme.palette.text.secondary};
    strong {
        color: ${({ theme }) => theme.palette.text.primary};
    }
`;

export const ConnectedWalletWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    border-radius: 12px;

    font-family: Poppins, sans-serif;
    font-weight: 600;
    font-size: 12px;

    cursor: pointer;
    transition: opacity 0.2s ease-in-out;
    -webkit-transform: translateZ(0);
    &:hover {
        opacity: 0.5;
    }

    background-color: ${({ theme }) => theme.palette.background.main};
`;

export const SubmitButtonWrapper = styled.div`
    width: 100%;
    margin-top: 20px;
`;

export const SwapErrorMessage = styled.div`
    color: ${({ theme }) => theme.palette.error.main};
    font-size: 12px;
    margin-top: 10px;
    padding: 0 20px;
    min-height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SwapOptionCurrencyContianer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    font-size: 10px;
    line-height: 26px;
    text-align: right;
`;

export const MaxButton = styled.button`
    background: ${({ theme }) => theme.palette.background.main};
    border-radius: 43px;
    padding: 2px 8px;
    border-width: 1px;
    border: 1px solid #0000002E;
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 10px;
    cursor: pointer;
    pointer-events: all;
`


export const BottomWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
        margin-top: -5px;
        color: ${({ theme }) => theme.palette.text.secondary || '#8f91a1'};
        font-size: 10px;
        line-height: 26px;
        text-align: right;
        white-space: nowrap;
    }
`

export const SwapInfo = styled.div`
    color: ${({ theme }) => theme.palette.text.secondary || '#8f91a1'};
    font-size: 12px;
    margin-top: 10px;
    padding-left: 20px;
    display: flex;
`;
