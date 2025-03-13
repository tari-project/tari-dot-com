import { StyledTypography, TypographyProps } from './styles';

export default function Typography({ $variant = 'p', children }: TypographyProps) {
    return <StyledTypography $variant={$variant}>{children}</StyledTypography>;
}
