import styled from 'styled-components';

export const screenReaderStyles = `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
`;
export const ScreenReaderH1 = styled.h1`
    ${screenReaderStyles}
`;
export const ScreenReaderH2 = styled.h2`
    ${screenReaderStyles}
`;
export const ScreenReaderH3 = styled.h2`
    ${screenReaderStyles}
`;
export const ScreenReaderSpan = styled.span`
    ${screenReaderStyles}
`;
export const ScreenReaderP = styled.span`
    ${screenReaderStyles}
`;
export const ScreenReaderDiv = styled.div`
    ${screenReaderStyles}
`;
