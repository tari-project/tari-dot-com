import styled, { css } from 'styled-components';

export const WalletActionButton = styled.button<{
    $variant?: 'primary' | 'secondary' | 'error' | 'success';
    $size?: 'small' | 'medium' | 'large' | 'xl';
}>`
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
    font-family: var(--font-poppins);
    line-height: 26px;
    letter-spacing: 0.46px;
    text-transform: capitalize;
    width: 100%;

    ${({ $variant }) => {
        switch ($variant) {
            case 'success':
                return css`
                    background: ${({ theme }) => theme.palette.success.main};
                    color: ${({ theme }) => theme.palette.text.primary};
                `;
            case 'primary':
                return css`
                    background: #523df1;
                    color: #fff;
                `;
            case 'secondary':
                return css`
                    background: #090719;
                    color: white;
                `;
            case 'error':
                return css`
                    background: #ff3636bf;
                    color: white;
                `;
            default:
                return css`
                    background: ${({ theme }) => theme.palette.primary.main};
                    color: ${({ theme }) => theme.palette.text.primary};
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
