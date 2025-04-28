import FAQSection from '../HomePage/sections/FAQSection/FAQSection';
import { Wrapper } from './styles';

export default function FaqPage() {
    return (
        <Wrapper>
            <FAQSection lightMode={true} maxWidth={967} disableAnimation />
        </Wrapper>
    );
}
