import { Title } from '../ExploreTariSection/styles';
import StepNumber from './components/StepNumber/StepNumber';
import {
    Wrapper,
    TitleWrapper,
    Holder,
    StepsWrapper,
    Step,
    StepTitle,
    BgImage,
    StepInside,
    FieldWrapper,
    FieldTitle,
    FieldInput,
    Emojis,
    FieldBox,
    LogoImage,
} from './styles';

import stop1Image from './images/step1.png';
import stop2Image from './images/step2.png';
import stop3Image from './images/step3.png';
import { Exchange } from '@/sites/exchange/types/exchange';
import CheckMarkIcon from './icons/CheckMarkIcon';

export default function StepsSection({ exchange }: { exchange: Exchange }) {
    return (
        <Wrapper>
            <Holder>
                <TitleWrapper>
                    <Title $color={exchange?.primary_colour}>
                        START EARNING IN &nbsp;<span>Three easy steps</span>
                    </Title>
                </TitleWrapper>
            </Holder>

            <StepsWrapper>
                <Step>
                    <StepNumber text="Step 1" color={exchange?.primary_colour} />
                    <StepInside>
                        <StepTitle>Install TARI UNIVERSE</StepTitle>
                        <BgImage src={stop1Image.src} alt="step1" />
                    </StepInside>
                </Step>
                <Step>
                    <StepNumber text="Step 2" color={exchange?.primary_colour} />
                    <StepInside>
                        <LogoImage src={exchange?.logo_img_small_url} alt={exchange?.name} />

                        <FieldWrapper>
                            <FieldBox>
                                <FieldTitle>Enter your {exchange?.name} Tari Address</FieldTitle>
                                <FieldInput>
                                    <Emojis>❤️ 💎 🖖 … ⭐ 👻 🦄</Emojis>
                                    <CheckMarkIcon />
                                </FieldInput>
                            </FieldBox>
                        </FieldWrapper>

                        <StepTitle>Enter your XTM address FROM {exchange?.name}</StepTitle>

                        <BgImage src={stop2Image.src} alt="step2" />
                    </StepInside>
                </Step>
                <Step>
                    <StepNumber text="Step 3" color={exchange?.primary_colour} />
                    <StepInside>
                        <StepTitle>Mine & earn</StepTitle>
                        <BgImage src={stop3Image.src} alt="step3" />
                    </StepInside>
                </Step>
            </StepsWrapper>
        </Wrapper>
    );
}
