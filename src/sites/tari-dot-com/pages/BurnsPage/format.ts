const MICRO_PER_XTM = 1_000_000;

/** Micro XTM (number or exact string) to a display string in whole XTM, grouped, no trailing noise. */
export function formatXtm(micro: number | string): string {
    const value = Number(micro) / MICRO_PER_XTM;
    if (!Number.isFinite(value)) return '0';
    return value.toLocaleString('en-US', { maximumFractionDigits: value < 1000 ? 2 : 0 });
}

/** First and last few characters of a hex commitment. */
export function shortCommitment(commitment: string): string {
    if (commitment.length <= 16) return commitment;
    return `${commitment.slice(0, 8)}…${commitment.slice(-6)}`;
}
