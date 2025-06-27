'use client';

import { useState } from 'react';
import checkmark from './images/checkmark.svg';
import copy from './images/copy.svg';
import Image from 'next/image';
import { CopyBoxContainer, CopiedPopup } from './styles';

interface CopyBoxProps {
    content: string;
}

function CopyBox({ content }: CopyBoxProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    return (
        <CopyBoxContainer onClick={handleCopy}>
            <CopiedPopup $visible={copied}>Copied!</CopiedPopup>
            {copied ? (
                <Image src={checkmark} alt="Copied" width={20} height={20} />
            ) : (
                <Image src={copy} alt="Copy" width={20} height={20} />
            )}
        </CopyBoxContainer>
    );
}

export default CopyBox;
