import { css, styled } from 'styled-components';

export interface TypographyProps {
    $variant?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'sectionTitle' | 'subTitle';
    $theme: 'light' | 'dark';
    children: React.ReactNode;
}

export const breakpoints = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};

export const typographyStyles = {
    p: css`
        font-size: 16px;
        font-family: var(--font-poppins), sans-serif;
    `,
    h1: css`
        font-size: 32px;
        font-family: var(--font-druk), sans-serif;
    `,
    h2: css`
        font-size: 28px;
        font-family: var(--font-druk), sans-serif;
    `,
    h3: css`
        font-size: 24px;
        font-family: var(--font-druk), sans-serif;
    `,
    h4: css`
        font-size: 20px;
        font-family: var(--font-poppins), sans-serif;
    `,
    h5: css`
        font-size: 18px;
        font-family: var(--font-poppins), sans-serif;
        font-weight: 600;
    `,
    h6: css`
        font-size: 16px;
        font-family: var(--font-poppins), sans-serif;
    `,
    sectionTitle: css`
        text-align: center;
        font-family: var(--font-druk), sans-serif;
        font-size: 48px;
        font-style: normal;
        font-weight: 800;
        text-transform: uppercase;

        @media (min-width: ${breakpoints.md}px) {
            font-size: 100px;
        }
    `,
    subTitle: css`
        font-family: var(--font-druk), sans-serif;
        font-size: 30px;
        font-style: normal;
        font-weight: 800;
        text-transform: uppercase;

        @media (min-width: ${breakpoints.md}px) {
            font-size: 36px;
        }
    `,
};

export const StyledTypography = styled.div<TypographyProps>`
    ${({ $variant }) => typographyStyles[$variant || 'p']}
    color: ${({ $theme }) => ($theme === 'light' ? '#111' : '#fff')};
`;
