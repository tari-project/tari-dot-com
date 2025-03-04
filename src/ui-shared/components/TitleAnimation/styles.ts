import styled from 'styled-components';
import { motion } from 'motion/react';

export const Wrapper = styled(motion.div)`
    display: inline-block;
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
