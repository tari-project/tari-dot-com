/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useRef } from 'react';
import { Wrapper } from './styles';
import Link from 'next/link';

interface Props {
    href?: string;
    onClick?: () => void;
}

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
}

function ContextMenu({ x, y, onClose }: ContextMenuProps) {
    const downloadFile = (filename: string, _displayName: string) => {
        const link = document.createElement('a');
        link.href = `/branding/${filename}`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: y,
                left: x,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 9999,
                minWidth: '180px',
                color: '#333',
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #eee', color: '#333' }}
                onClick={() => downloadFile('tari-white.svg', 'download logo (white)')}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
                download logo (white)
            </div>
            <div
                style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #eee', color: '#333' }}
                onClick={() => downloadFile('tari-black.svg', 'download logo (black)')}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
                download logo (black)
            </div>
            <div
                style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #eee', color: '#333' }}
                onClick={() => downloadFile('xtm.svg', 'download XTM logo')}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
                download XTM logo
            </div>
            <div
                style={{ padding: '8px 12px', cursor: 'pointer', color: '#333' }}
                onClick={() => downloadFile('brandkit.zip', 'download brand kit')}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
                download brand kit
            </div>
        </div>
    );
}

export default function TariLogo({ href, onClick }: Props) {
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const closeContextMenu = () => {
        setContextMenu(null);
    };

    React.useEffect(() => {
        const handleClickOutside = () => closeContextMenu();
        if (contextMenu) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [contextMenu]);

    const logo = (
        <svg viewBox="0 0 121 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_258_2)">
                <path
                    d="M77.1523 6.73535L68.8486 31.2625H74.1612L75.9133 25.5915H83.1963L84.9483 31.2625H90.2609L81.9573 6.73535H77.1523ZM77.3288 20.9975L79.5557 13.6872L81.7826 20.9975H77.3306H77.3288Z"
                    fill="currentColor"
                />
                <path d="M121 6.73535H116.062V31.2625H121V6.73535Z" fill="currentColor" />
                <path
                    d="M103.002 21.8235C107.536 21.5852 110.138 18.8397 110.138 14.2913C110.138 9.74279 107.236 6.73535 102.376 6.73535H93.0685V31.2625H98.0063V23.5974L104.767 31.2625H111.126L102.735 21.8362L103.002 21.8217V21.8235ZM98.0063 17.2532V11.3311H102.205C104.121 11.3311 105.133 12.3554 105.133 14.2931C105.133 16.2307 104.121 17.2532 102.205 17.2532H98.0063Z"
                    fill="currentColor"
                />
                <path
                    d="M56.7215 31.2643H61.6574V11.3293H69.9466V6.73535H48.4323V11.3293H56.7215V31.2643Z"
                    fill="currentColor"
                />
                <path
                    d="M0 10.2215V20.6884L15.321 37.7961L37.0481 20.7502V10.2124L15.3902 0.203934L0 10.2215ZM13.4816 30.1765L3.71336 19.2693V13.3381L13.4816 15.8506V30.1765ZM17.195 31.6065V16.804L31.4044 20.4591L17.195 31.6065ZM33.3366 12.5848V17.1224L6.72081 10.2779L15.6958 4.43582L33.3348 12.5867L33.3366 12.5848Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_258_2">
                    <rect width="121" height="37.5921" fill="currentColor" transform="translate(0 0.203934)" />
                </clipPath>
            </defs>
        </svg>
    );

    return (
        <>
            <Wrapper className="tari-logo" ref={logoRef} onContextMenu={handleContextMenu}>
                {href ? (
                    <Link href={href} onClick={onClick}>
                        {logo}
                    </Link>
                ) : (
                    logo
                )}
            </Wrapper>
            {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={closeContextMenu} />}
        </>
    );
}
