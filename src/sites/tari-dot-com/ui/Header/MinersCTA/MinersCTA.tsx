'use client';

import React from 'react';
import { Button, ButtonWrapper, Wrapper } from './styles';
import ArrowIcon from './ArrowIcon';

import { useDownloadUniverse } from '@/services/api/useDownloadUniverse';
import ActiveNodes from '../ActiveNodes/ActiveNodes';
import { useUIStore } from '@/stores/useUiStore';

interface Props {
    theme: 'light' | 'dark';
    buttonText: string;
    hoverAnimation?: boolean;
    hoverText?: string;
    noBackground?: boolean;
}

export default function MinersCTA({ theme, buttonText, noBackground }: Props) {
    const { handleDownloadClick } = useDownloadUniverse();
    const { setShowDownloadModal } = useUIStore();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        handleDownloadClick(e);
        setShowDownloadModal(true);
    };

    return (
        <Wrapper $theme={theme} $noBackground={noBackground}>
            <ActiveNodes theme={theme} />
            <ButtonWrapper>
                <Button $theme={theme} href="/downloads" onClick={handleClick}>
                    <span>{buttonText}</span> <ArrowIcon className="arrow-icon" />
                </Button>
            </ButtonWrapper>
        </Wrapper>
    );
}
