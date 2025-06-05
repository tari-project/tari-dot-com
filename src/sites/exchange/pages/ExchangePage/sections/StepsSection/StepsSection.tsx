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
    StepTitleWrapper,
    StepPill,
    StepRowWrapper,
} from './styles';

import step1Image from './images/step1.png';
import step2Image from './images/step2.png';
import step3Image from './images/step3.png';
import { Exchange } from '@/sites/exchange/types/exchange';
import CheckMarkIcon from './icons/CheckMarkIcon';
import DownloadButton from '@/sites/tari-dot-com/pages/HomePage/sections/IntroSection/components/DownloadButton/DownloadButton';
import { getTextColorForBg, getValidHexColor } from '@/sites/exchange/utils';

export default function StepsSection({ exchange }: { exchange: Exchange }) {
    const color = getValidHexColor(exchange?.primary_colour);
    const textColor = getTextColorForBg(color);

    return (
        <Wrapper>
            <Holder>
                <TitleWrapper>
                    <Title $color={color}>
                        START EARNING IN &nbsp;<span>Three easy steps</span>
                    </Title>
                </TitleWrapper>
            </Holder>

            <StepsWrapper>
                <Step>
                    <StepNumber text="Step 1" color={color} />
                    <StepInside>
                        <StepTitleWrapper>
                            <StepTitle>Install TARI UNIVERSE</StepTitle>
                            <DownloadButton backgroundColor={color} textColor={textColor} showIconBackground={true} />
                        </StepTitleWrapper>
                        <BgImage src={step1Image.src} alt="step1" />
                    </StepInside>
                </Step>
                <Step>
                    <StepNumber text="Step 2" color={color} />
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

                        <StepTitleWrapper>
                            <StepTitle>Enter your XTM address FROM {exchange?.name}</StepTitle>
                        </StepTitleWrapper>

                        <BgImage src={step2Image.src} alt="step2" />
                    </StepInside>
                </Step>
                <Step>
                    <StepNumber text="Step 3" color={color} />
                    <StepInside>
                        <StepRowWrapper>
                            <StepTitle>
                                Mine
                                <br /> & earn
                            </StepTitle>
                            <StepPill $color={color}>15% Bonus XTM</StepPill>
                        </StepRowWrapper>
                        <BgImage src={step3Image.src} alt="step3" />
                    </StepInside>
                </Step>
            </StepsWrapper>
        </Wrapper>
    );
}
