import styled from 'styled-components';

export const CardHolder = styled.button`
    width: 100%;
    background-color: #fff;
    border-radius: 30px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
    a,
    h3 {
        color: #111;
    }

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

export const CardTitle = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-bottom: 10px;
`;

export const CardLink = styled.div`
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
`;

export const CardsContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
`;
