import styled from 'styled-components';

export const CopyBoxContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 32px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    padding: 8px;
    transition: background-color 0.3s, transform 0.3s;
    position: relative;
    &:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.9);
    }
`;

export const CopiedPopup = styled.div<{ $visible: boolean }>`
    position: absolute;
    top: 0px;
    right: 40px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 12px;
    padding: 6px 16px;
    border-radius: 16px;
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    pointer-events: none;
    transition: opacity 0.3s;
    will-change: opacity;
    z-index: 1;
`;
