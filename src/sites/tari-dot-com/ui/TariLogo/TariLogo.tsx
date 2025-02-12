'use client';

import React from 'react';
import { Wrapper } from './styles';

interface Props {
    width?: number;
}

export default function TariLogo({ width = 121 }: Props) {
    return (
        <Wrapper $width={width}>
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
        </Wrapper>
    );
}
