'use client';

import { Wrapper, Holder, Text, GradientText } from './styles';

export default function Banner() {
    return (
        <Wrapper>
            <Holder>
                <Text>
                    Tari is in Testnet. <GradientText>Mainnet launches May 6, 2025!</GradientText>
                    {/*}Tari Mainnet <GradientText>is live</GradientText>{*/}
                </Text>
            </Holder>
        </Wrapper>
    );
}
