import styled from 'styled-components';

export const ContainerStyle = styled.div`
    width: 100%;
    overflow-x: hidden;
    padding: 16px;
    box-sizing: border-box;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    position: relative;
    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

export const PreStyle = styled.div`
    white-space: pre;
    margin: 0;
    color: #474747;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    overflow-x: auto;
`;

export const CopyBoxWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    padding: 8px;
`;

export const Note = styled.div<{ $variant: 'default' | 'warning' | 'success' | 'info' | 'secondary' }>`
    margin: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    border: 2px solid
        ${({ $variant }) =>
            $variant === 'warning'
                ? '#FFB938'
                : $variant === 'success'
                ? '#10C115'
                : $variant === 'info'
                ? '#00AAD9'
                : $variant === 'secondary'
                ? '#B0D636'
                : '#f9f9f9'};
    background-color: ${({ $variant }) =>
        $variant === 'warning'
            ? '#FFF6E5'
            : $variant === 'success'
            ? '#EFFFF0'
            : $variant === 'info'
            ? '#E6F9FE'
            : $variant === 'secondary'
            ? '#F4F3F7'
            : '#F4F3F7'};
`;

export const NoteDivider = styled.div`
    background-color: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    margin: 10px;
    box-sizing: border-box;
`;

export const NoteTitle = styled.div`
    font-weight: bold;
    margin: 15px;
`;
