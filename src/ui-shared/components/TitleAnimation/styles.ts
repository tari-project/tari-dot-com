import styled from 'styled-components';
import { motion } from 'motion/react';

export const Wrapper = styled(motion.div)<{ $align?: 'left' | 'center' | 'right' }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: ${({ $align = 'left' }) => {
        switch ($align) {
            case 'center':
                return 'center';
            case 'right':
                return 'flex-end';
            default:
                return 'flex-start';
        }
    }};

    @media (max-width: 807px) {
        justify-content: center;
    }
`;

export const WordWrapper = styled.span`
    display: inline-flex;
    overflow: hidden;
    position: relative;
`;

export const WordAnimation = styled(motion.span)`
    position: absolute;
`;

export const WordSpacer = styled.span`
    visibility: hidden;
`;

export const Space = styled.span``;
