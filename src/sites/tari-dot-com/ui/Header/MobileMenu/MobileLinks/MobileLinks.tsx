'use client';

import React from 'react';
import { NavLink, Wrapper } from './styles';
import { headerLinks } from '../../Header';

export default function MobileLinks() {
    return (
        <Wrapper>
            {headerLinks.map(({ href, title }) => (
                <NavLink key={`${title}-header`} href={href}>
                    {title}
                </NavLink>
            ))}
        </Wrapper>
    );
}
