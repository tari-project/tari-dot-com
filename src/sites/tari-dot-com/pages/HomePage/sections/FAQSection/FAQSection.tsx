'use client';

import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Wrapper, Carousel, Container } from './styles';
import Slide from './components/Slide/Slide';

import image1 from './images/image1.png';
import image2 from './images/image2.png';

export default function FAQSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'center',
            containScroll: false,
            dragFree: true,
            skipSnaps: false,
        },
        [
            AutoScroll({
                playOnInit: true,
                stopOnInteraction: false,
                speed: 2,
                startDelay: 0,
            }),
        ]
    );

    const handleMouseEnter = () => {
        emblaApi?.plugins()?.autoScroll?.stop();
    };

    const handleMouseLeave = () => {
        emblaApi?.plugins()?.autoScroll?.play();
    };

    return (
        <Wrapper>
            <Carousel ref={emblaRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Container>
                    <Slide
                        title="What is the ootle?"
                        text={
                            <>
                                <strong>Developers, are you ready!</strong> Soon you will be able to build you&apos;re
                                next big project here on Tari.
                            </>
                        }
                        image={image1.src}
                    />
                    <Slide
                        title="How fast is it?"
                        text={
                            <>
                                <strong>Lightning fast!</strong> Built with speed and efficiency in mind from day one.
                            </>
                        }
                        image={image2.src}
                    />
                    <Slide
                        title="Is it safe?"
                        text={
                            <>
                                <strong>Security first!</strong> Your assets are protected by cutting-edge blockchain
                                technology.
                            </>
                        }
                        image={image1.src}
                    />
                    <Slide
                        title="Who can use it?"
                        text={
                            <>
                                <strong>Everyone!</strong> Whether you&apos;re a developer or user, Tari is designed for
                                you.
                            </>
                        }
                        image={image2.src}
                    />
                    <Slide
                        title="When launch?"
                        text={
                            <>
                                <strong>Coming soon!</strong> Stay tuned for our exciting launch announcement.
                            </>
                        }
                        image={image1.src}
                    />
                    <Slide
                        title="Why Tari?"
                        text={
                            <>
                                <strong>Why not?</strong> Join the future of decentralized applications today.
                            </>
                        }
                        image={image2.src}
                    />
                </Container>
            </Carousel>
        </Wrapper>
    );
}
