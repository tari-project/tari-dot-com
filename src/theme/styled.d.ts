import 'styled-components';
import { ThemePalette } from './types';
import { ThemeComponents } from './components';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemePalette, ThemeComponents {}
}
