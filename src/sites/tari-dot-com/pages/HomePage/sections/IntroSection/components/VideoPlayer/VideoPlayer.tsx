import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { Container } from './styles';

interface VideoPlayerProps {
    src: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    playsInline?: boolean;
    poster?: string;
    controls?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    src,
    autoPlay = true,
    muted = true,
    loop = false,
    playsInline = true,
    poster,
    controls = false,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        let hls: Hls | null = null;

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoElement);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (autoPlay) {
                    videoElement.play().catch((error) => {
                        console.error('Failed to autoplay video:', error);
                    });
                }
            });
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            videoElement.src = src;
            if (autoPlay) {
                videoElement.play().catch((error) => {
                    console.error('Failed to autoplay video:', error);
                });
            }
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [src, autoPlay]);

    return (
        <Container>
            <video
                ref={videoRef}
                muted={muted}
                autoPlay={autoPlay}
                loop={loop}
                playsInline={playsInline}
                poster={poster}
                controls={controls}
            />
        </Container>
    );
};

export default VideoPlayer;
