import { css, styled } from 'styled-components';

export interface TypographyProps {
    $variant?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'sectionTitle' | 'subTitle';
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
        color: #fff;
    `,
    h1: css`
        font-size: 32px;
        font-family: var(--font-druk), sans-serif;
        color: #fff;
    `,
    h2: css`
        font-size: 28px;
        font-family: var(--font-druk), sans-serif;
        color: #fff;
    `,
    h3: css`
        font-size: 24px;
        font-family: var(--font-druk), sans-serif;
        color: #fff;
    `,
    h4: css`
        font-size: 20px;
        font-family: var(--font-poppins), sans-serif;
        color: #fff;
    `,
    h5: css`
        font-size: 18px;
        font-family: var(--font-poppins), sans-serif;
        font-weight: 600;
        color: #fff;
    `,
    h6: css`
        font-size: 16px;
        font-family: var(--font-poppins), sans-serif;
        color: #fff;
    `,
    sectionTitle: css`
        color: #fff;
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
        color: #fff;
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
`;
