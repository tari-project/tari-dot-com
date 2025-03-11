'use client';

import React from 'react';
import { NavLink, Wrapper } from './styles';
import { usePathname, useRouter } from 'next/navigation';
import { scrollToElement } from '@/sites/tari-dot-com/utils/scrollUtils';
import { useMainStore } from '@/services/stores/useMainStore';

const headerLinks = [
    { title: 'How it Works', href: '/#how-it-works' },
    { title: 'Mine Tari', href: '/downloads' },
    { title: 'Air Drop', href: 'https://airdrop.tari.com/' },
];

export default function MobileLinks({}) {
    const { setShowMobileMenu } = useMainStore();

    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#')) {
            e.preventDefault();
            const id = href.substring(2);

            if (pathname === '/' || pathname === '') {
                scrollToElement(id);
                window.history.pushState(null, '', href);
                setShowMobileMenu(false);
            } else {
                sessionStorage.setItem('scrollToSection', id);
                router.push(href);
            }
        } else {
            setShowMobileMenu(false);
        }
    };

    return (
        <Wrapper>
            {headerLinks.map(({ href, title }) => (
                <NavLink key={`${title}-header`} href={href} onClick={(e) => handleClick(e, href)}>
                    {title}
                </NavLink>
            ))}
        </Wrapper>
    );
}
