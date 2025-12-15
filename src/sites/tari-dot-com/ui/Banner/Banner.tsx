'use client';

import { Wrapper, Holder, Text, GradientText } from './styles';

type Props = {
    children?: React.ReactNode;
};
export default function Banner({ children }: Props) {
    return (
        <Wrapper>
            <Holder>
                {children || (
                    <Text>
                        Tari Mainnet <GradientText>is live</GradientText>
                    </Text>
                )}
            </Holder>
        </Wrapper>
    );
}
