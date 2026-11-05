const FULL_FIRE_MICRO = 200_000_000n * 1_000_000n;

export function fireStrength(micro: bigint) {
    const capped = micro > FULL_FIRE_MICRO ? FULL_FIRE_MICRO : micro;
    return Math.log1p(Number(capped) / 1_000_000_000) / Math.log1p(Number(FULL_FIRE_MICRO) / 1_000_000_000);
}

export function formatMicro(amount: bigint) {
    const whole = (amount / 1_000_000n).toLocaleString('en-US');
    const fraction = (amount % 1_000_000n).toString().padStart(6, '0').replace(/0+$/, '');
    return whole + (fraction ? '.' + fraction : '');
}
