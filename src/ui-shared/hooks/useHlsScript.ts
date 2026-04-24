'use client';

import { useEffect, useState } from 'react';
import type HlsType from 'hls.js';

/**
 * Dynamically imports the bundled `hls.js` dependency on the client.
 *
 * Previously this hook injected a <script> tag pointing at cdnjs at runtime
 * and exposed the result via `window.Hls`. That duplicated a dep we already
 * ship in package.json, cost an extra third-party network round-trip, and
 * left consumers depending on a global.
 *
 * Now consumers receive the Hls class directly and can construct players
 * without a window global:
 *
 *   const Hls = useHlsScript();
 *   if (!Hls) return null;
 *   const player = new Hls();
 *
 * Returns `null` until the dynamic import resolves.
 */
export const useHlsScript = (): typeof HlsType | null => {
    const [Hls, setHls] = useState<typeof HlsType | null>(null);

    useEffect(() => {
        let cancelled = false;
        void import('hls.js').then((mod) => {
            if (!cancelled) {
                setHls(() => mod.default);
            }
        });
        return () => {
            cancelled = true;
        };
    }, []);

    return Hls;
};
