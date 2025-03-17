'use client';

import { useState, useEffect } from 'react';

const HLS_SCRIPT_URL = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.4.14/hls.min.js';

export const useHlsScript = () => {
    const [hlsLoaded, setHlsLoaded] = useState(false);

    useEffect(() => {
        if (window.Hls) {
            setHlsLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = HLS_SCRIPT_URL;
        script.async = true;
        script.onload = () => setHlsLoaded(true);

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return hlsLoaded;
};
