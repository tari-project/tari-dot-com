'use client';

import { Container, Wrapper, Eyebrow, MainText, Text, Middle } from './styles';
import ImageSpinner from './components/ImageSpinner/ImageSpinner';
import MinersCTA from '@/sites/tari-dot-com/ui/Header/MinersCTA/MinersCTA';

export default function TariSection() {
    return (
        <Wrapper>
            <Container>
                <Middle>
                    <Eyebrow>THIS IS TARI</Eyebrow>

                    <MainText>
                        Tari is built <ImageSpinner defaultImage={1} /> to empower <ImageSpinner defaultImage={2} />{' '}
                        creators and communities <ImageSpinner defaultImage={3} /> to securely manage digital assets{' '}
                        <ImageSpinner defaultImage={4} /> with privacy <ImageSpinner defaultImage={5} /> and
                        flexibility.
                    </MainText>

                    <Text>
                        Tari is the L1 protocol powered by you. Proof of work and an ingenious app platform to put all
                        of its power in your hands.
                    </Text>

                    <MinersCTA theme="light" id="tari-section-miners" />
                </Middle>
            </Container>
        </Wrapper>
    );
}
