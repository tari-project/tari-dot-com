import { motion } from 'motion/react';
import styled from 'styled-components';

export const Wrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99999;

    display: flex;
    justify-content: center;

    pointer-events: all;

    overflow: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`;

export const Padding = styled.div`
    padding: 140px 40px 140px 40px;

    @media (max-width: 796px) {
        padding: 100px 40px 100px 40px;
    }

    @media (max-width: 688px) {
        padding: 100px 20px 100px 20px;
    }
`;

export const Cover = styled(motion.div)`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
    cursor: pointer;
    backdrop-filter: blur(4px);
`;

export const BoxWrapper = styled(motion.div)`
    width: 100%;
    flex-shrink: 0;
    border-radius: 31px;
    background: #e4e3ec;
    box-shadow: 28px 28px 77px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 40px;

    max-width: 798px;
    padding: 80px;

    @media (max-width: 796px) {
        padding: 40px;
    }

    @media (max-width: 688px) {
        padding: 20px;
    }
`;

export const CloseButton = styled.button`
    cursor: pointer;
    position: absolute;
    top: 33px;
    right: 33px;

    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 796px) {
        top: 20px;
        right: 20px;
    }
`;
