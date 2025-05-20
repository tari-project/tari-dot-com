import { Label, TopBorder, Wrapper, Line, BottomBorder } from './styles';
import TrackComponent from '@/sites/tari-dot-com/pages/HomePage/sections/EcosystemSection/components/Community/Track';

export default function TrustedBySection() {
    return (
        <Wrapper>
            <TopBorder>
                <Label>Tari is trusted by</Label>
                <Line />
            </TopBorder>
            <TrackComponent />
            <BottomBorder>
                <Line />
            </BottomBorder>
        </Wrapper>
    );
}
