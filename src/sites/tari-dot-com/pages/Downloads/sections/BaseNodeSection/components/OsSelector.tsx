'use client';
import { useState, useEffect } from 'react';
import { OsWrapper, OsLabel, OsButton, ButtonsWrapper } from './styles';

import React from 'react';

type Os = 'Mac' | 'Windows' | 'Linux';

function OsSelector() {
    const [selectedOs, setSelectedOs] = useState<Os>('Linux');
    useEffect(() => {
        const userAgent = window.navigator.userAgent;
        if (userAgent.indexOf('Mac') !== -1) {
            setSelectedOs('Mac');
        } else if (userAgent.indexOf('Windows') !== -1) {
            setSelectedOs('Windows');
        } else if (userAgent.indexOf('Linux') !== -1) {
            setSelectedOs('Linux');
        }
    }, []);

    const handleOsChange = (os: Os) => {
        setSelectedOs(os);
    };

    return (
        <OsWrapper>
            <OsLabel>Download for </OsLabel>
            <ButtonsWrapper>
                <OsButton onClick={() => handleOsChange('Mac')} selected={selectedOs === 'Mac'}>
                    Mac
                </OsButton>
                <OsButton onClick={() => handleOsChange('Windows')} selected={selectedOs === 'Windows'}>
                    Windows
                </OsButton>
                <OsButton onClick={() => handleOsChange('Linux')} selected={selectedOs === 'Linux'}>
                    Linux
                </OsButton>
            </ButtonsWrapper>
        </OsWrapper>
    );
}

export default OsSelector;
