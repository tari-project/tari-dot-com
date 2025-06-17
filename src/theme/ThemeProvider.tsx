import { ReactNode } from 'react';
import { DefaultTheme, ThemeProvider as SCThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';
import { useUIStore } from '@/stores/useUiStore';
const themes = {
    dark: darkTheme,
    light: lightTheme,
};
export default function ThemeProvider({ children }: { children: ReactNode }) {
    const uiTheme = useUIStore((s) => s.theme);
    const theme = themes[uiTheme] as DefaultTheme;
    return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>;
}
