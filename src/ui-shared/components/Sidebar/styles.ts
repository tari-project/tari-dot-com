import styled from 'styled-components';
const sidebarBreakpoint = 1090;

export const MenuItem = styled.button<{ $isActive?: boolean }>`
    background: none;
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap: 10px;
    justify-content: flex-start;
    text-align: left;
    border: none;
    color: ${({ $isActive }) => ($isActive ? '#813bf5' : '#111')};
    padding: 16px;
    cursor: pointer;
    outline: none;
    border-radius: 16px;
    transition: background 0.2s, color 0.2s;
    will-change: background, color;
    background: ${({ $isActive }) => ($isActive ? 'rgba(0,0,0,0.02)' : 'transparent')};

    &:hover,
    &:focus {
        background: rgba(0, 0, 0, 0.02);
        color: #813bf5;
    }

    @media (max-width: ${sidebarBreakpoint}px) {
        padding: 12px;
        font-size: 14px;
    }
`;

export const MenuContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 30px;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 30px;
    background: #fff;
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 200px;

    @media (max-width: ${sidebarBreakpoint}px) {
        width: 100%;
        position: static;
        top: 0;
        padding: 20px;
    }
`;

export const MenuTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: #111;
    margin-bottom: 10px;
`;
