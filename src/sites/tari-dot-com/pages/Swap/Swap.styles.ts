import { SwapDirection as SwapDirectionType } from '@/ui-shared/hooks/swap/lib/types';
import styled, { css } from 'styled-components';

export const OptionContainer = styled.div<{ $paddingBottom?: number }>`
    margin-top: 5px;
    display: flex;
    gap: 3px;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.palette.text.primary};
    background: ${({ theme }) => theme.palette.background.main};
    border-radius: 20px;
    padding: 25px 15px;

    ${({ $paddingBottom }) =>
        $paddingBottom &&
        css`
            padding-bottom: ${$paddingBottom}px;
        `}
`;

export const SwapOption = styled.div<{ $paddingBottom?: number }>`
    display: flex;
    flex-direction: column;
    gap: 3px;

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
    border-radius: 60px;
    gap: 6px;
    height: 35px;
    padding-left: 6px;
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
    margin-right: 10px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${({ theme }) => theme.palette.text.secondary};
    }

    ${({ $error }) =>
        $error &&
        css`
            color: ${({ theme }) => theme.palette.error.main};
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
    font-family: Poppins, sans-serif;
    font-weight: 600;
    font-size: 16px;
    margin: 0;
`;

export const CurrentStep = styled.span`
    font-family: Poppins, sans-serif;
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
    font-family: Poppins, sans-serif;
    margin-top: 10px;
    margin-bottom: -10px;
    min-height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
