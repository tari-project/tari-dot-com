'use client';

import { OutlineButton } from './styles';

export default function WhatIsTariButton() {
    const handleOutlineClick = () => {
        if (typeof window !== 'undefined') {
            document.getElementById('explore-tari-section')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <OutlineButton onClick={handleOutlineClick}>
            <span>What is Tari?</span>
        </OutlineButton>
    );
}
