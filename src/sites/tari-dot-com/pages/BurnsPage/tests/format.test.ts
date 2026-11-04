import { describe, expect, it } from 'vitest';
import { formatXtm, shortCommitment } from '../format';

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

describe('shortCommitment', () => {
    it('truncates long commitments and leaves short ones alone', () => {
        expect(shortCommitment('0123456789abcdef0123456789abcdef')).toBe('01234567…abcdef');
        expect(shortCommitment('abc')).toBe('abc');
    });
});
