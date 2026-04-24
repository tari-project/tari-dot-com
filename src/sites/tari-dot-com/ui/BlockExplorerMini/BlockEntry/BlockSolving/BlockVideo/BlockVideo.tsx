import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HLSPlayerProps {
    src: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    playsInline?: boolean;
}

function HLSPlayer({ src, autoPlay = true, muted = true, loop = true, playsInline = true }: HLSPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        let hls: Hls | null = null;
        let cancelled = false;

        const tryPlay = () => {
            if (cancelled || !autoPlay) return;
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
                playPromise.catch((error: unknown) => {
                    // Ignore expected interruptions:
                    // - AbortError: play() interrupted by pause, src change, unmount, or
                    //   browser power-save pausing background/offscreen video.
                    // - NotAllowedError: autoplay policy (muted autoplay should normally
                    //   be allowed, but log as warning if it isn't).
                    if (error instanceof DOMException) {
                        if (error.name === 'AbortError') return;
                        if (error.name === 'NotAllowedError') {
                            console.warn('Autoplay blocked by browser policy:', error.message);
                            return;
                        }
                    }
                    console.error('Failed to autoplay video:', error);
                });
            }
        };

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoElement);
            hls.on(Hls.Events.MANIFEST_PARSED, tryPlay);
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            videoElement.src = src;
            tryPlay();
        }

        return () => {
            cancelled = true;
            if (hls) {
                hls.destroy();
            }
        };
    }, [src, autoPlay]);

    return <video ref={videoRef} muted={muted} autoPlay={autoPlay} loop={loop} playsInline={playsInline} />;
}

export default function BlockVideo({ isSolved }: { isSolved?: boolean }) {
    if (isSolved) {
        return (
            <HLSPlayer
                src={`https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/852dac0dc91d50d399a7349dcc7316a1/manifest/video.m3u8`}
                autoPlay={true}
                loop={false}
            />
        );
    } else {
        return (
            <HLSPlayer
                src={`https://customer-o6ocjyfui1ltpm5h.cloudflarestream.com/3ed05f3d4fbfd3eec7c4bb911915d1c2/manifest/video.m3u8`}
                autoPlay={true}
                loop={true}
            />
        );
    }
}
