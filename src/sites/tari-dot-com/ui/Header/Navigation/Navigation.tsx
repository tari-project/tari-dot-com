'use client';

import React from 'react';
import { NavLink, Wrapper } from './styles';
import { headerLinks } from '../Header';
import { scrollToElement } from '../../../utils/scrollUtils';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation() {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#')) {
            e.preventDefault();
            const id = href.substring(2);

            if (pathname === '/' || pathname === '') {
                scrollToElement(id);
                window.history.pushState(null, '', href);
            } else {
                sessionStorage.setItem('scrollToSection', id);
                router.push(href);
            }
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
