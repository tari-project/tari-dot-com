import styled, { css } from 'styled-components';

export const WalletActionButton = styled.button<{
    $variant?: 'primary' | 'secondary' | 'error' | 'success';
    $size?: 'small' | 'medium' | 'large' | 'xl';
}>`
    font-family: Poppins, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 1px 12px;
    border-radius: 30px;
    border: none;
    background: #ffffff40;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    line-height: 26px;
    letter-spacing: 0.46px;
    text-transform: capitalize;
    width: 100%;

    ${({ $variant }) => {
        switch ($variant) {
            case 'success':
                return css`
                    background: #06C983;
                    color: #212121;
                `;
            case 'primary':
                return css`
                    background: #523df1;
                    color: white;
                `;
            case 'secondary':
                return css`
                    background: #E7D0FF;
                    color: #212121;
                `;
            case 'error':
                return css`
                    background: #C44B3A;
                    color: white;
                `;
            default:
                return css`
                    background: #523df1;
                    color: #212121;
                `;
        }
    }}

    ${({ $size }) => {
        switch ($size) {
            case 'small':
                return css`
                    padding: 1px 12px;
                    font-size: 12px;
                    line-height: 26px;
                `;
            case 'medium':
                return css`
                    padding: 2px 24px;
                    font-size: 12px;
                    line-height: 26px;
                `;
            case 'large':
                return css`
                    padding: 12px 24px;
                    font-size: 14px;
                    line-height: 26px;
                `;
            case 'xl':
                return css`
                    padding: 17px 24px;
                    font-size: 14px;
                    line-height: 26px;
                `;
            default:
                return css`
                    padding: 1px 12px;
                    font-size: 12px;
                    line-height: 26px;
                `;
        }
    }}

    &[disabled] {
        opacity: 0.5;
        pointer-events: none;
    }
`;
