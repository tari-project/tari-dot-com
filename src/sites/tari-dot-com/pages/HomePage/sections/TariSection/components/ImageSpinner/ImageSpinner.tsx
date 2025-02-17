'use client';

import { useState, useEffect, useRef } from 'react';
import { Wrapper, Image } from './styles';

import image1 from '../../images/image1.png';
import image2 from '../../images/image2.png';
import image3 from '../../images/image3.png';
import image4 from '../../images/image4.png';
import image5 from '../../images/image5.png';

const images = [image1, image2, image3, image4, image5];

interface Props {
    defaultImage: number;
}

export default function ImageSpinner({ defaultImage }: Props) {
    const [currentImage, setCurrentImage] = useState<number>(defaultImage - 1);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

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
        <Wrapper onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {images.map((img, index) => (
                <Image key={index} src={img.src} alt="" $isActive={index === currentImage} />
            ))}
        </Wrapper>
    );
}
