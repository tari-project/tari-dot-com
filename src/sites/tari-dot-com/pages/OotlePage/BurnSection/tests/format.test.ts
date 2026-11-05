import { describe, expect, it } from 'vitest';
import { fireStrength, formatMicro } from '../format';

describe('formatMicro', () => {
    it('converts micro XTM to whole XTM', () => {
        expect(formatMicro(123_456_789_000_000n)).toBe('123,456,789');
    });

    it('keeps the exact fraction and trims trailing zeros', () => {
        expect(formatMicro(1_500_000n)).toBe('1.5');
        expect(formatMicro(1_000_001n)).toBe('1.000001');
    });

    it('stays exact past the float range', () => {
        expect(formatMicro(9_007_199_254_740_993_000_001n)).toBe('9,007,199,254,740,993.000001');
    });
});

describe('fireStrength', () => {
    it('runs from 0 to 1 and caps at 200M XTM', () => {
        expect(fireStrength(0n)).toBe(0);
        expect(fireStrength(200_000_000n * 1_000_000n)).toBe(1);
        expect(fireStrength(5_000_000_000n * 1_000_000n)).toBe(1);
    });
});
