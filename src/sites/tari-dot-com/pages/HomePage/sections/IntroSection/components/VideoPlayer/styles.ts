import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        will-change: transform;
    }
`;
