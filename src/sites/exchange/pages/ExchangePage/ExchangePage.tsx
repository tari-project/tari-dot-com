import FAQSection from '@/sites/tari-dot-com/pages/HomePage/sections/FAQSection/FAQSection';
import ExploreTariSection from './sections/ExploreTariSection/ExploreTariSection';
import HeroSection from './sections/HeroSection/HeroSection';
import StepsSection from './sections/StepsSection/StepsSection';
import TrustedBySection from './sections/TrustedBySection/TrustedBySection';
import { Wrapper } from './styles';

interface Props {
    name: string;
}

const pageData = {
    exchange: {
        name: 'Something',
        logoHeader: '',
        logoSquare: '',
        color: '#3E86C9',
    },
};

export default function ExchangePage({ name }: Props) {
    console.log(name, pageData);

    return (
        <Wrapper>
            <HeroSection />
            <StepsSection />
            <TrustedBySection />
            <ExploreTariSection />
            <FAQSection />
        </Wrapper>
    );
}
