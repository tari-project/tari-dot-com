import { Text, Title } from '../ExploreTariSection/styles';
import StepNumber from './components/StepNumber/StepNumber';
import { Wrapper, TitleWrapper, Holder, StepsWrapper, Step, StepTitle, BgImage, StepInside } from './styles';

import stop1Image from './images/step1.png';
import stop2Image from './images/step2.png';
import stop3Image from './images/step3.png';

export default function StepsSection() {
    return (
        <Wrapper>
            <Holder>
                <TitleWrapper>
                    <Title>
                        GET CONNECTED IN &nbsp;<span>Three easy steps</span>
                    </Title>
                    <Text>Get connected and start earning in as little as 60 seconds.</Text>
                </TitleWrapper>
            </Holder>

            <StepsWrapper>
                <Step>
                    <StepNumber text="Step 1" />
                    <StepInside>
                        <StepTitle>Download & Install</StepTitle>
                        <BgImage src={stop1Image.src} alt="step1" />
                    </StepInside>
                </Step>
                <Step>
                    <StepNumber text="Step 2" />
                    <StepInside>
                        <StepTitle>Enter your [ExchangeHere] xtm address</StepTitle>
                        <BgImage src={stop2Image.src} alt="step2" />
                    </StepInside>
                </Step>
                <Step>
                    <StepNumber text="Step 3" />
                    <StepInside>
                        <StepTitle>Mine & earn</StepTitle>
                        <BgImage src={stop3Image.src} alt="step3" />
                    </StepInside>
                </Step>
            </StepsWrapper>
        </Wrapper>
    );
}
