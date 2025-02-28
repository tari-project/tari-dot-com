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
    flex-direction: row;
    align-items: center;
`;

export const OsLabel = styled.label`
    color: #dfe5f2;
    font-family: var(--font-poppins), sans-serif;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
`;

export const OsButton = styled.button<{ selected: boolean }>`
    background-color: ${({ selected }) => (selected ? '#c9eb00' : 'rgba(255, 255, 255, 0.05)')};
    border: ${({ selected }) => (selected ? '1px solid #c9eb00' : '1px solid rgba(255, 255, 255, 0.3)')};
    display: flex;
    width: 100%;
    padding: 10px 30px;
    justify-content: space-between;
    align-items: center;
    border-radius: 70px;
    font-family: var(--font-poppins), sans-serif;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    transition: background 0.3s, color 0.3s;
    color: ${({ selected }) => (selected ? '#000' : '#fff')};

    &:hover {
        background-color: ${({ selected }) => (selected ? '#c9eb00' : '#b3d800')};
        color: #000;
    }
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: row;
`;
