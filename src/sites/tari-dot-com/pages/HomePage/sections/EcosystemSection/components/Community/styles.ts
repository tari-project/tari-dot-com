import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
`;

export const Holder = styled(motion.div)`
    width: 100%;
    max-width: 1671px;
    margin: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;

    padding: 60px 20px;

    @media (max-width: 960px) {
        padding-top: 80px;
        padding-bottom: 10px;
    }
`;

export const Image = styled.img``;

export const TrackWrapper = styled(motion.div)`
    display: flex;
    align-items: center;

    width: 100%;
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    position: relative;
    height: 92px;
`;

export const TrackWidth = styled.div`
    min-width: max-content;
    width: max-content;
    position: absolute;
    top: 0;
`;

export const Track = styled(motion.div)`
    display: flex;
    align-items: center;
    gap: 62px;

    min-width: max-content;

    padding-left: 62px;

    @media (max-width: 768px) {
        gap: 20px;
        padding-left: 20px;
    }
`;

export const Copy = styled.div`
    text-align: center;
    padding: 100px 20px 0px 20px;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.46px;

    @media (max-width: 768px) {
        font-size: 24px;
        line-height: 120%;
        padding-top: 50px;
    }
`;
