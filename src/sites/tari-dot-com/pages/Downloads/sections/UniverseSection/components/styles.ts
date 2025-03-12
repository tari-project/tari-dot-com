import styled from 'styled-components';
import { motion } from 'framer-motion';

export const OptionsWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    max-width: 348px;
`;

export const QRPopupContainer = styled.div`
    position: relative;
`;
export const QRButton = styled.div`
    background: none;
    border: none;
    cursor: pointer;
`;
export const QRPopupContent = styled(motion.div)`
    position: absolute;
    padding: 15px;
    top: -210px;
    left: -6px;
    right: 0;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 180px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
