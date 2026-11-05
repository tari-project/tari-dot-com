'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import { BurnStats, useBurnStats } from '@/services/api/useBurnStats';
import { useLaunchTarget } from '@/services/api/useLaunchTarget';
import { fireStrength, formatMicro } from './format';
import {
    Section,
    Intro,
    Title,
    Lede,
    LaunchMessage,
    DayOne,
    Clock,
    ClockDigits,
    ClockSoon,
    Primary,
    Stats,
    FireScene,
    FireShade,
    Stat,
    Network,
    Value,
    Label,
    DataError,
    Details,
    Secondary,
    Divider,
} from './styles';

const ZERO: BurnStats = { micro: 0n, burns: 0n, people: 0n };
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function useCountUp(target: BurnStats | undefined) {
    const [shown, setShown] = useState<BurnStats>(ZERO);
    const [settled, setSettled] = useState(false);
    const shownRef = useRef<BurnStats>(ZERO);
    const firstRef = useRef(true);

    useEffect(() => {
        if (!target) return;
        const from = shownRef.current;
        const paint = (value: BurnStats) => {
            shownRef.current = value;
            setShown(value);
        };

        if (prefersReducedMotion() || document.hidden || target.micro <= from.micro) {
            paint(target);
            setSettled(true);
            firstRef.current = false;
            return;
        }

        const duration = firstRef.current ? 3200 : 2000;
        firstRef.current = false;
        setSettled(false);
        const started = performance.now();
        let frame = 0;
        const step = (now: number) => {
            const progress = Math.min(1, (now - started) / duration);
            if (progress === 1) {
                paint(target);
                setSettled(true);
                return;
            }
            const eased = progress * progress * (3 - 2 * progress);
            const part = BigInt(Math.round(eased * 1_000_000));
            const lerp = (key: keyof BurnStats) => from[key] + ((target[key] - from[key]) * part) / 1_000_000n;
            paint({ micro: lerp('micro'), burns: lerp('burns'), people: lerp('people') });
            frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);

        return () => cancelAnimationFrame(frame);
    }, [target]);

    return { shown, settled };
}

function useNow() {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    return now;
}

function LaunchClock() {
    const { data: target } = useLaunchTarget();
    const now = useNow();
    if (target === null || target === undefined) return null;

    const left = Math.max(0, Math.ceil((target - now) / 1000));

    const values = [Math.floor(left / 86400), Math.floor(left / 3600) % 24, Math.floor(left / 60) % 60, left % 60];
    const units = ['Days', 'Hours', 'Minutes', 'Seconds'];
    const label = left
        ? `${values[0]} days, ${values[1]} hours, ${values[2]} minutes, ${values[3]} seconds until TARI launch`
        : 'Launching soon';

    return (
        <Clock role="timer" aria-live="off" aria-label={label}>
            {left ? (
                <ClockDigits>
                    {units.map((unit, i) => (
                        <span key={unit}>
                            <b>{String(values[i]).padStart(2, '0')}</b>
                            <span>{unit}</span>
                        </span>
                    ))}
                </ClockDigits>
            ) : (
                <ClockSoon>Launching soon.</ClockSoon>
            )}
        </Clock>
    );
}

export default function BurnSection() {
    const { data, isError } = useBurnStats();
    const { shown, settled } = useCountUp(data);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => {
            if (!document.hidden && !motion.matches) {
                if (!video.getAttribute('src')) video.src = '/assets/burn/flames.mp4';
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        };
        sync();
        document.addEventListener('visibilitychange', sync);
        motion.addEventListener('change', sync);
        return () => {
            document.removeEventListener('visibilitychange', sync);
            motion.removeEventListener('change', sync);
        };
    }, []);

    const heat = fireStrength(shown.micro);
    useEffect(() => {
        const video = videoRef.current;
        if (video) video.defaultPlaybackRate = video.playbackRate = 0.65 + 0.6 * heat;
    }, [heat]);

    const loading = !data && !isError;
    const failed = !data && isError;
    const xtm = failed ? '—' : settled ? formatMicro(shown.micro) : (shown.micro / 1_000_000n).toLocaleString('en-US');
    const burns = failed ? '—' : shown.burns.toLocaleString('en-US');
    const people = failed ? '—' : shown.people.toLocaleString('en-US');

    return (
        <>
            <Section id="burns">
                <Intro>
                    <Title>
                        XTM burned.
                        <br />
                        <em>For the Ootle.</em>
                    </Title>
                    <Lede>
                        <LaunchMessage>
                            <strong>Receive TARI at launch.</strong>
                        </LaunchMessage>
                        <DayOne>
                            Get your TARI on day one. Burn your XTM now and claim it the moment the chain goes live,
                            with no waiting on block times.
                        </DayOne>
                        <LaunchClock />
                        <Primary href="/downloads">
                            <span className="title">Download Tari Universe</span>
                            <span className="detail">Burn from your wallet</span>
                        </Primary>
                    </Lede>
                </Intro>

                <Stats
                    aria-label="Mainnet burn totals"
                    aria-busy={loading}
                    style={
                        {
                            '--fire-rise': `${72 * (1 - heat)}%`,
                            '--fire-opacity': String(0.28 + 0.54 * heat),
                            '--fire-brightness': String(0.72 + 0.4 * heat),
                            '--ember-opacity': String(0.12 + 0.2 * heat),
                        } as CSSProperties
                    }
                >
                    <FireScene aria-hidden="true">
                        <video ref={videoRef} muted loop playsInline preload="none" poster="/assets/burn/flames.jpg" />
                        <FireShade />
                    </FireScene>
                    <Stat className="total">
                        <Network>Mainnet</Network>
                        <Value $loading={loading} $long={data ? formatMicro(data.micro).length > 6 : false}>
                            {xtm}
                        </Value>
                        <Label>XTM burned</Label>
                    </Stat>
                    <Stat className="count">
                        <Value $loading={loading} $long={data ? data.burns.toLocaleString('en-US').length > 4 : false}>
                            {burns}
                        </Value>
                        <Label>Burns</Label>
                    </Stat>
                    <Stat className="people">
                        <Value $loading={loading} $long={data ? data.people.toLocaleString('en-US').length > 4 : false}>
                            {people}
                        </Value>
                        <Label>Unique burners</Label>
                    </Stat>
                </Stats>
                {isError && <DataError role="status">Burn totals are unavailable right now.</DataError>}
                <Details>
                    <Secondary href="/tokenomics">Tokenomics</Secondary>
                </Details>
            </Section>
            <Divider aria-hidden="true" />
        </>
    );
}
