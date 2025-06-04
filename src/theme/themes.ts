import { DefaultTheme } from 'styled-components';
import { componentSettings } from './components';
import lightPalette from './palettes/light';
import darkPalette from './palettes/dark';

const lightTheme: DefaultTheme = {
    ...lightPalette,
    ...componentSettings,
};

const darkTheme: DefaultTheme = {
    ...darkPalette,
    ...componentSettings,
};

export { lightTheme, darkTheme };
