'use client';

import { Eyebrow, Holder, Wrapper } from './styles';

import TrackComponent from './Track';

interface Props {
    label?: string;
}

export default function Community({ label = 'Supported by' }: Props) {
    return (
        <Wrapper
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.15, 0, 0, 0.97] }}
        >
            <Holder>
                <Eyebrow>{label}</Eyebrow>
                <TrackComponent />
            </Holder>
        </Wrapper>
    );
}
