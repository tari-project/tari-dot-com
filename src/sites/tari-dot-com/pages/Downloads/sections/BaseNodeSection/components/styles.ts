import styled from 'styled-components';

export const OptionsWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    max-width: 348px;
`;

export const OsWrapper = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: center;

    @media (min-width: 769px) {
        flex-direction: row;
    }
`;

export const OsLabel = styled.label`
    color: #dfe5f2;
    font-family: var(--font-poppins), sans-serif;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
`;

export const OsButton = styled.button<{ selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 60px;
    padding: 6px 10px;
    border-radius: 70px;
    color: ${({ selected }) => (selected ? '#000' : '#fff')};
    background: ${({ selected }) => (selected ? '#c9eb00' : 'rgba(255, 255, 255, 0.05)')};
    font-weight: 600;
    font-family: var(--font-druk), sans-serif;
    transition: background 0.3s;
    text-transform: uppercase;
    flex: 1;
    font-size: 24px;
    border: ${({ selected }) => (selected ? '2px solid #c9eb00' : '2px solid rgba(255, 255, 255, 0.3)')};
    min-width: 348px;

    &:hover {
        background: #b3d800;
        color: #000;
    }

    @media (min-width: 769px) {
        min-width: 140px;
    }
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;

    @media (min-width: 769px) {
        flex-direction: row;
    }
`;
