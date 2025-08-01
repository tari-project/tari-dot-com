import { StyledTypography, TypographyProps } from './styles';

export default function Typography({ $variant = 'p', $theme = 'dark', children }: TypographyProps) {
    return <StyledTypography $variant={$variant} $theme={$theme}>{children}</StyledTypography>;
}
