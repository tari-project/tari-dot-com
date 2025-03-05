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
                        <TitleAnimation text={`Tari`} /> <TitleAnimation text={`is`} />{' '}
                        <TitleAnimation text={`built`} /> <ImageSpinner defaultImage={1} />{' '}
                        <TitleAnimation text={`to`} /> <TitleAnimation text={`empower`} />{' '}
                        <ImageSpinner defaultImage={2} /> <TitleAnimation text={`creators`} />{' '}
                        <TitleAnimation text={`and`} /> <TitleAnimation text={`communities`} />{' '}
                        <ImageSpinner defaultImage={3} /> <TitleAnimation text={`to`} />{' '}
                        <TitleAnimation text={`securely`} /> <TitleAnimation text={`manage`} />{' '}
                        <TitleAnimation text={`digital`} /> <TitleAnimation text={`assets`} />{' '}
                        <ImageSpinner defaultImage={4} /> <TitleAnimation text={`with`} />{' '}
                        <TitleAnimation text={`privacy`} /> <ImageSpinner defaultImage={5} />{' '}
                        <TitleAnimation text={`and`} /> <TitleAnimation text={`flexibility.`} />
                    </MainText>

                    <Text>
                        <TitleAnimation
                            text={`Tari is the L1 protocol powered by you. Proof of work and an ingenious app platform to put all of its power in your hands.`}
                            staggerDelay={0.009}
                        />
                    </Text>

                    <MinersCTA theme="light" />
                </Middle>
            </Container>
        </Wrapper>
    );
}
