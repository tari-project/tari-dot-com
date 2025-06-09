export function getValidHexColor(color: string, fallback: string = '#595959'): string {
    if (typeof color !== 'string') return fallback;
    // Match #RGB, #RRGGBB, #RGBA, #RRGGBBAA
    if (/^#([0-9a-fA-F]{3,4}){1,2}$/.test(color)) return color;
    return fallback;
}

function hexToRgb(hex: string): [number, number, number] | null {
    let c = hex.replace('#', '');
    if (c.length === 3)
        c = c
            .split('')
            .map((x) => x + x)
            .join('');
    if (c.length !== 6) return null;
    const num = parseInt(c, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function isColorDark(hex: string): boolean {
    const rgb = hexToRgb(hex);
    if (!rgb) return false;
    // Perceived luminance formula
    const [r, g, b] = rgb;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 150;
}

export function getTextColorForBg(hex: string): string {
    return isColorDark(hex) ? '#fff' : '#161616';
}

export function isValidImage(url?: string) {
    if (!url) return false;
    return /\.(svg|png|jpe?g)$/i.test(url);
}
