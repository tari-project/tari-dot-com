'use client';

import { useState, useEffect, useRef } from 'react';
import { Wrapper, Image } from './styles';
import { useInView } from 'motion/react';

import image1 from '../../images/image1.png';
import image2 from '../../images/image2.png';
import image3 from '../../images/image3.png';
import image4 from '../../images/image4.png';

const images = [image1, image2, image3, image4];

interface Props {
    defaultImage: number;
}

export default function ImageSpinner({ defaultImage }: Props) {
    const [currentImage, setCurrentImage] = useState<number>(defaultImage - 1);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isHovered) {
            intervalRef.current = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % images.length);
            }, 100);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                setCurrentImage(defaultImage - 1);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isHovered, defaultImage]);

    return (
        <Wrapper
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
        >
            {images.map((img, index) => (
                <Image key={index} src={img.src} alt="" $isActive={index === currentImage} />
            ))}
        </Wrapper>
    );
}
