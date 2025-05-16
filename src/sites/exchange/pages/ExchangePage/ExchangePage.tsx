import FAQSection from '@/sites/tari-dot-com/pages/HomePage/sections/FAQSection/FAQSection';
import ExploreTariSection from './components/ExploreTariSection/ExploreTariSection';
import HeroSection from './components/HeroSection/HeroSection';
import StepsSection from './components/StepsSection/StepsSection';
import TrustedBySection from './components/TrustedBySection/TrustedBySection';
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
