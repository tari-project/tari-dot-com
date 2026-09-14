import React from 'react';
import { IconGroup, Wrapper, ContentWrapper, Divider, GradientText } from './styles';
import ActiveNodes from '@/sites/tari-dot-com/ui/Header/ActiveNodes/ActiveNodes';
import BlueCheckIcon from './icons/BlueCheckIcon';
import GithubIcon from './icons/GithubIcon';
import Link from 'next/link';
import RightCurve from './icons/RightCurve';

export default function MetaInfo() {
    return (
        <>
            <Wrapper>
                <ContentWrapper>
                    <IconGroup>
                        <BlueCheckIcon />
                        <span>
                            Proudly <GradientText>Open Source</GradientText>
                        </span>
                    </IconGroup>
                    <Divider />
                    <IconGroup as={Link} href="https://github.com/tari-project" target="_blank" rel="noreferrer">
                        <GithubIcon />
                        View on GitHub
                    </IconGroup>
                    <Divider />
                    <ActiveNodes theme="dark" />
                </ContentWrapper>
            </Wrapper>

            <RightCurve />
        </>
    );
}
