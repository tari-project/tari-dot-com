import styled from 'styled-components';

export const ContentGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-top: 30px;
    width: 100%;

    @media (max-width: 768px) {
        gap: 30px;
    }
`;

export const TextGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 11px;
`;

export const Title = styled.div`
    color: #111;
    text-align: center;
    font-family: var(--font-druk), sans-serif;
    font-size: 66px;
    font-style: normal;
    font-weight: 800;
    line-height: 94.2%;
    text-transform: uppercase;

    @media (max-width: 796px) {
        font-size: 48px;
    }
`;

export const Text = styled.div`
    color: #111;
    text-align: center;
    font-family: var(--font-poppins), sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
    opacity: 0.7;
`;

export const Divider = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

export const DividerLine = styled.div`
    width: 100%;
    height: 1px;
    opacity: 0.2;
    background: #000;
    flex-grow: 1;
`;

export const DividerText = styled.div`
    color: #111;
    text-align: center;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
    white-space: nowrap;
    opacity: 0.5;
`;

export const DownloadButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const DownloadButton = styled.a`
    color: #fff;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 99.7%;
    text-transform: uppercase;

    height: 64px;
    padding: 20px 36px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 50px;
    background: #000;

    width: 33.33333%;

    cursor: pointer;

    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
        text-decoration: none;
    }

    &:active {
        transform: scale(1);
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const TariLogoImage = styled.img`
    width: 190px;

    position: absolute;
    top: -90px;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 768px) {
        width: 180px;
        top: -80px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    width: 100%;
    padding-top: 10px;
`;

export const FormFields = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 11px;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const Input = styled.input`
    width: 100%;
    height: 60px;
    padding: 24px 42px;
    color: #000;
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    border-radius: 100px;
    border: none;

    &::placeholder {
        color: #000;
        opacity: 0.5;
    }

    &:focus {
        outline: 2px solid #000;
    }
`;

export const SubmitButton = styled.button`
    width: 100%;
    height: 60px;
    padding: 10px 15px 10px 20px;

    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;

    border-radius: 100px;
    background: #ffbe40;

    color: #000;
    font-family: var(--font-poppins), sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 94.2%;
    letter-spacing: -0.75px;

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: transform 0.3s ease-in-out;
    }

    &:hover {
        span {
            transform: scale(1.075);
        }
    }

    &:active {
        span {
            transform: scale(1);
        }
    }
`;

export const SuccessMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    padding: 40px 40px;
    width: 100%;

    ${Text} {
        max-width: 440px;
    }
`;
