'use client';

import { Container, Wrapper, Eyebrow, MainText, Text, Middle } from './styles';
import ImageSpinner from './components/ImageSpinner/ImageSpinner';
import MinersCTA from '@/sites/tari-dot-com/ui/Header/MinersCTA/MinersCTA';
import TitleAnimation from '@/ui-shared/components/TitleAnimation/TitleAnimation';

export default function TariSection() {
    return (
        <Wrapper>
            <Container>
                <Middle>
                    <Eyebrow>
                        <TitleAnimation text={`THIS IS TARI`} />
                    </Eyebrow>

                    <MainText>
                        <TitleAnimation text={`TARI`} /> <TitleAnimation text={`IS`} /> <TitleAnimation text={`A`} />{' '}
                        <TitleAnimation text={`NEW`} /> <ImageSpinner defaultImage={1} />{' '}
                        <TitleAnimation text={`FINANCIAL`} /> <ImageSpinner defaultImage={2} />{' '}
                        <TitleAnimation text={`SYSTEM`} /> <TitleAnimation text={`BUILT`} />{' '}
                        <TitleAnimation text={`TO`} /> <TitleAnimation text={`EMPOWER`} />{' '}
                        <TitleAnimation text={`BUILDERS`} /> <TitleAnimation text={`AND`} />{' '}
                        <TitleAnimation text={`CREATORS.`} /> <TitleAnimation text={`IT'S`} />{' '}
                        <ImageSpinner defaultImage={3} /> <TitleAnimation text={`OPEN`} />{' '}
                        <TitleAnimation text={`SOURCE,`} /> <TitleAnimation text={`BEAUTIFULLY`} />{' '}
                        <TitleAnimation text={`SIMPLE,`} /> <TitleAnimation text={`AND`} />{' '}
                        <TitleAnimation text={`KEEPS`} /> <ImageSpinner defaultImage={4} />{' '}
                        <TitleAnimation text={`YOU`} /> <TitleAnimation text={`SAFE.`} />
                    </MainText>

                    <Text>
                        <TitleAnimation
                            text={`Tari is a revolutionary blockchain protocol powered by you. Proof of work. Default confidential. And for the first time, easy to use. Tari Universe puts all the power of Tari in your hands.`}
                            staggerDelay={0.009}
                        />
                    </Text>

                    <MinersCTA theme="light" buttonText={`Download Tari Universe`} noBackground={true} />
                </Middle>
            </Container>
        </Wrapper>
    );
}
