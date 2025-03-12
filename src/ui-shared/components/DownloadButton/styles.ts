import styled from 'styled-components';

export const Button = styled.button`
    display: flex;
    width: 348px;
    height: 60px;
    padding: 20px 6px 20px 30px;
    justify-content: space-between;
    align-items: center;
    border-radius: 70px;
    background: #c9eb00;
    font-weight: 600;
    font-family: var(--font-druk), sans-serif;
    font-size: 24px;
    transition: background 0.3s;
    text-transform: uppercase;

    &:hover {
        background: #b3d800;
    }
`;

export const IconWrapper = styled.div`
    background: rgba(0, 0, 0, 0.2);
    padding: 6px;
    border-radius: 50%;
`;

export const OsButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 60px;
    padding: 6px 10px;
    border-radius: 70px;
    background: #c9eb00;
    font-weight: 600;
    font-family: var(--font-druk), sans-serif;
    transition: background 0.3s;
    text-transform: uppercase;
    flex: 1;
    font-size: 24px;
    border: 2px solid #c9eb00;
    min-width: 348px;

    &:hover {
        background: #b3d800;
    }

    @media (min-width: 769px) {
        min-width: 140px;
    }
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    flex-direction: column;

    @media (min-width: 769px) {
        flex-direction: row;
    }
`;
