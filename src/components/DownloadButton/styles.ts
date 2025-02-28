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
    font-family: 'Poppins', sans-serif;
    transition: background 0.3s;

    &:hover {
        background: #b3d800;
    }
`;

export const IconWrapper = styled.div`
    background: rgba(0, 0, 0, 0.2);
    padding: 6px;
    border-radius: 50%;
`;
