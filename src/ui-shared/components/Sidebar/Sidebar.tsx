'use client';

import React, { useEffect, useState } from 'react';
import { MenuItem, MenuContainer, MenuTitle } from './styles';

interface MenuItemProps {
    label: string;
    link?: string;
    isActive?: boolean;
    items?: {
        label: string;
        link: string;
        external?: boolean;
    }[];
}

interface SidebarProps {
    menuTitle: string;
    menuItems: MenuItemProps[];
    activeSection?: string;
    onNavigate?: (link: string) => void;
}

export const sidebarBreakpoint = 1090;

function Sidebar({ menuTitle, menuItems, activeSection: propActiveSection, onNavigate }: SidebarProps) {
    const [activeSection, setActiveSection] = useState<string | undefined>(propActiveSection);

    useEffect(() => {
        if (propActiveSection) {
            setActiveSection(propActiveSection);
            return;
        }

        const sectionIds = menuItems
            .filter((item) => item.link)
            .map((item) => item.link!.replace('#', ''));
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            if (visibleSections.length > 0) {
                setActiveSection(`#${visibleSections[0].target.id}`);
            }
        };

        const observer = new window.IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '0px 0px -60% 0px',
            threshold: [0.2, 0.5, 1],
        });

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            observer.disconnect();
        };
    }, [menuItems, propActiveSection]);

    const handleClick = (link: string, external?: boolean) => {
        if (external) {
            window.open(link, '_blank', 'noopener,noreferrer');
            return;
        }
        
        const anchor = document.getElementById(link.replace('#', ''));
        if (anchor) {
            const rect = anchor.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const top = rect.top + scrollTop - 150;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        if (onNavigate) {
            onNavigate(link);
        }
        setActiveSection(link);
    };

    return (
        <MenuContainer>
            <MenuTitle>{menuTitle}</MenuTitle>
            {menuItems.map((item, index) => (
                <div key={item.link || item.label}>
                    {item.link ? (
                        <MenuItem
                            $isActive={activeSection === item.link}
                            tabIndex={0}
                            aria-current={activeSection === item.link ? 'page' : undefined}
                            onClick={() => handleClick(item.link!)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleClick(item.link!);
                                }
                            }}
                        >
                            <span style={{ minWidth: '12px' }}>{index + 1}.</span> {item.label}
                        </MenuItem>
                    ) : (
                        <div>
                            <MenuItem $isActive={false} tabIndex={-1}>
                                <span style={{ minWidth: '12px' }}>{index + 1}.</span> {item.label}
                            </MenuItem>
                            {item.items?.map((subItem) => (
                                <MenuItem
                                    key={subItem.link}
                                    $isActive={false}
                                    tabIndex={0}
                                    style={{ marginLeft: '20px', fontSize: '14px' }}
                                    onClick={() => handleClick(subItem.link, subItem.external)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            handleClick(subItem.link, subItem.external);
                                        }
                                    }}
                                >
                                    {subItem.label}
                                </MenuItem>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </MenuContainer>
    );
}

export default Sidebar;
