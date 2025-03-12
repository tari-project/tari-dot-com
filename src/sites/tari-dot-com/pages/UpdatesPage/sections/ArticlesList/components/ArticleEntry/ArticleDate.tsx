'use client';

import { useState, useEffect } from 'react';

interface ArticleDateProps {
    dateString: string;
}

export default function ArticleDate({ dateString }: ArticleDateProps) {
    const [formattedDate, setFormattedDate] = useState<string>('');

    useEffect(() => {
        if (dateString) {
            const date = new Date(dateString);
            const formatted = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            setFormattedDate(formatted);
        }
    }, [dateString]);

    if (!formattedDate) return null;

    return formattedDate;
}
