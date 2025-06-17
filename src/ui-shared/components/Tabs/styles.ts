import styled from 'styled-components';
import { motion } from 'framer-motion';

interface TabItemProps {
    $isActive: boolean;
}

export const TabItem = styled.div<TabItemProps>`
    display: flex;
    padding: 15px 30px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: ${({ $isActive }) => ($isActive ? '#b0d636' : '#fff')};
    background-color: ${({ $isActive }) => ($isActive ? 'rgba(255, 255, 255, 0.10)' : 'transparent')};
    transition: background-color 0.5s, color 0.5s;

    &:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.15);
        color: #b0d636;
    }
`;

export const Tabs = styled.div`
    background: #2a2a2d;
    display: flex;
    width: 100%;
    flex-direction: column;
    min-width: 0;

    @media (min-width: 1100px) {
        flex-direction: row;
    }
`;

export const TabContent = styled(motion.div)`
    width: 100%;
    min-width: 0;
    background: rgba(255, 255, 255, 0.3);
    color: #474747;
`;

export const TabContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 30px;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    min-width: 0;
`;

export const CopyBoxContainer = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 2;
`;

export const CodeContainer = styled.pre`
    width: 100%;
    min-width: 0;
    overflow-x: auto;
    padding-right: 48px;
    margin: 0;
    font-size: 14px;
    font-family: 'Courier New', Courier, monospace;
    box-sizing: border-box;
    background: transparent;

    white-space: pre; /* keep pre-formatting */
    word-wrap: normal; /* prevent wrapping mid-word */
    overflow-wrap: normal;

    @media (max-width: 600px) {
        font-size: 12px;
        padding-right: 0;
    }
`;
