import { Colours } from './palettes/colors';
import { ColoursAlpha } from './palettes/colorsAlpha';

type ThemeTuple = 'light' | 'dark';
export type Theme = ThemeTuple[number];

type ColourTypes =
    | 'main'
    | 'dark'
    | 'light'
    | 'shadow'
    | 'wisp'
    | 'primary'
    | 'secondary'
    | 'disabled'
    | 'contrast'
    | 'accent'
    | 'default';
type ColourTuple = 'primary' | 'secondary' | 'default' | ColourTypes;
type ColourKey = ColourTuple[number];

type StandardColour = Record<ColourKey, string>;
type Colour = Partial<Record<ColourKey, string>>;
type GraidentKey = 'setupBg' | 'radialBg' | 'miningButtonStarted' | 'miningButtonHover' | ColourKey;
type Gradients = Partial<Record<GraidentKey, string>>;

export interface ThemePalette {
    mode: Theme;
    palette: Palette;
    colors: Colours;
    colorsAlpha: ColoursAlpha;
    gradients: Gradients;
}

interface Palette {
    base: string;
    contrast: string;
    contrastAlpha: string;
    primary: Omit<StandardColour, 'primary' | 'secondary' | 'default'>;
    secondary: Colour;
    success: Colour;
    warning: Colour;
    error: Colour;
    text: Colour;
    component: Colour;
    divider: string;
    background: {
        default: string;
        splash: string;
        paper: string;
        accent: string;
        main: string;
        secondary: string;
    };
    action: {
        hover: Colour;
        background: Colour;
        text: Colour;
    };
}
