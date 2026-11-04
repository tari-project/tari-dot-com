import { describe, expect, it } from 'vitest';
import { formatXtm } from '../format';

describe('formatXtm', () => {
    it('converts micro XTM strings to whole XTM', () => {
        expect(formatXtm('123456789000000')).toBe('123,456,789');
    });

    it('keeps cents on small amounts', () => {
        expect(formatXtm(1_500_000)).toBe('1.5');
    });

    it('does not blow up on garbage', () => {
        expect(formatXtm('nope')).toBe('0');
    });
});
