'use client';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    cursor: pointer;
`;

export const DropdownSelected = styled.div`
    padding: 15px 25px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    border-radius: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
`;

export const DropdownOptions = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px;
    background-color: #fff;
    border-radius: 20px;
    z-index: 100;
`;

export const DropdownOption = styled(motion.div)`
    padding: 12px;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background-color: #fff;
    border: 1px solid #fff;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export const DropdownOptionSelected = styled(motion.div)`
    padding: 12px;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background-color: #f0f0f0;
    border: 1px solid #fff;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export const Label = styled.p`
    font-size: 14px;
    color: #c9eb00;
    padding-left: 5px;
    padding-right: 5px;
    position: absolute;
    top: -10px;
    left: 20px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
`;
