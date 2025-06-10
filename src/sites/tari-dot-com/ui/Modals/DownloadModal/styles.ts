import styled from 'styled-components';

export const ContentGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 60px;
    padding-top: 80px;

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
    width: 283px;

    position: absolute;
    top: -114px;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 768px) {
        width: 180px;
        top: -80px;
    }
`;
