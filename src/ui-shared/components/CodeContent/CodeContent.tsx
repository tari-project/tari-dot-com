'use client';

import { ContainerStyle, PreStyle, CopyBoxWrapper } from './styles';
import CopyBox from '../CopyBox/CopyBox';

interface CodeBlockProps {
    code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
    return (
        <ContainerStyle>
            <CopyBoxWrapper>
                <CopyBox content={code} />
            </CopyBoxWrapper>
            <PreStyle>
                <code>{code}</code>
            </PreStyle>
        </ContainerStyle>
    );
};

export default CodeBlock;
