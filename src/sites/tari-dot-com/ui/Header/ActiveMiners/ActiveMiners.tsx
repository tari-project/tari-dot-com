import { useMinerStats } from "@/services/api/useMinerStats";
import { Dot, TextWrapper, Text, NumberWrapper, } from "./styles";
import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";

interface Props {
    theme: 'light' | 'dark';
}

export default function ActiveMiners({ theme, }: Props) {
    const { data } = useMinerStats();
    const countValue = data?.totalMiners ?? 0;
    const [numberWidth, setNumberWidth] = useState(26);
    const numberRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (numberRef.current) {
            const width = numberRef.current.offsetWidth;
            setNumberWidth(width > 0 ? width : 26);
        }
    }, [countValue]);

    return <TextWrapper>
        <Dot $theme={theme} />
        <Text $theme={theme}>
            <NumberWrapper style={{ width: `${numberWidth}px` }}>
                <span ref={numberRef}>
                    <NumberFlow
                        value={countValue}
                        format={{
                            notation: countValue > 10000 ? 'compact' : 'standard',
                            compactDisplay: 'short',
                            maximumFractionDigits: 1,
                        }}
                    />
                </span>
            </NumberWrapper>
            active miners
        </Text>
    </TextWrapper>
}
