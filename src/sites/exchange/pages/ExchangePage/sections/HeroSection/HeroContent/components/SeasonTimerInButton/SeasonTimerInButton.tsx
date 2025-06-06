'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { TimeLeft, Wrapper } from './styles';

export default function SeasonTimerInButton({ date }: { date: Date | string }) {
    const targetDate = useMemo(() => (typeof date === 'string' ? new Date(date) : date), [date]);

    const getTimeLeft = useCallback(() => {
        const now = Date.now();
        const diff = Math.max(0, Math.floor((targetDate.getTime() - now) / 1000));
        return diff;
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);
        return () => clearInterval(interval);
    }, [getTimeLeft]);

    const pad = (n: number) => n.toString().padStart(2, '0');
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    //const seconds = timeLeft % 60;

    return (
        <Wrapper>
            Hurry! Bonus ends in
            <TimeLeft>
                {pad(days)}D {pad(hours)}H {pad(minutes)}M
            </TimeLeft>
        </Wrapper>
    );
}
