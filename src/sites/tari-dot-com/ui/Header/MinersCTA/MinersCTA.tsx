'use client';

import React from 'react';
import { Button, ButtonWrapper, Wrapper } from './styles';
import ArrowIcon from './ArrowIcon';

import { useDownloadUniverse } from '@/services/api/useDownloadUniverse';
import ActiveNodes from '../ActiveNodes/ActiveNodes';
import { useUIStore } from '@/stores/useUiStore';
import { usePathname } from 'next/navigation';

interface Props {
    theme: 'light' | 'dark';
    variant?: 'main' | 'ootle';
    buttonText: string;
    hoverAnimation?: boolean;
    hoverText?: string;
    noBackground?: boolean;
}

export default function MinersCTA({ theme, buttonText, noBackground }: Props) {
    const { handleDownloadClick } = useDownloadUniverse();
    const { setShowDownloadModal } = useUIStore();
    const pathname = usePathname();
    const isOotlePage = pathname === '/ootle' || pathname === '/';
    const variant = isOotlePage ? 'ootle' : 'main';

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        handleDownloadClick(e);
        setShowDownloadModal(true);
    };

    return (
        <Wrapper $theme={theme} $noBackground={noBackground}>
            <ActiveNodes theme={theme} variant={variant} />
            <ButtonWrapper>
                <Button $theme={theme} $variant={variant} href="/downloads" onClick={handleClick}>
                    <span>{buttonText}</span> <ArrowIcon className="arrow-icon" />
                </Button>
            </ButtonWrapper>
        </Wrapper>
    );
}
