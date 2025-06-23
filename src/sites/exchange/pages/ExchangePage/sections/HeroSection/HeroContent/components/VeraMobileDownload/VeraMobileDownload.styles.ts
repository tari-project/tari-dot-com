import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    display: none;
    flex-direction: column;
    gap: 15px;
    overflow: hidden;

    @media (max-width: 430px) {
        display: flex;
        width: 100%;
        max-width: unset;
        padding: 0 20px;
    }
`;

export const Eyebrow = styled.div`
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
`;

export const CtaContainer = styled.div`
    overflow: visible;
    position: relative;
`;

export const CtaWrapper = styled.div`
    display: flex;
    background: linear-gradient(95.93deg, #9A0AED 14.32%, #CE0EC2 109.86%);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
`;

export const CTAContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 18px 85px 18px 18px;
    gap: 0px;
`;

export const CTAEyebrow = styled.div`
    font-family: var(--font-poppins), sans-serif;
    color: #F9A414;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    gap: 3px;
    span {
        color: #fff;
        display: flex;
        align-items: center;
        gap: 2px;
        svg {
            align-items: center;
            width: 12px;
            height: 12px;
            fill: #fff;
        }
    }
`;

export const CTACopy = styled.div`
    font-family: var(--font-druk-wide), sans-serif;
    font-size: 18px;
    font-weight: 700;
    font-style: italic;
    color: #fff;
`;

const circeStyle = css`
    content: '';
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    border-radius: 50%;
    background: #ffffff1a;
`

export const CirclesBG = styled.div`
    ${circeStyle}
    width: 70px;
    height: 70px;
    right: 40px;
    &::before {
        ${circeStyle}
        z-index: 1;
        width: 105px;
        height: 105px;
    }
    &::after {
        ${circeStyle}
        width: 40px;
        height: 40px;
    }
`;

export const RobotImage = styled.img`
    position: absolute;
    top: -15px;
    right: -5px;
    height: 110px;
    object-fit: cover;
`;


export const CopyDivider = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-poppins), sans-serif;
    font-weight: 600;
    font-size: 14px;
    padding-top: 10px;
    div {
        height: 1px;
        width: 100%;
        background: #fff;
        opacity: 0.1;
    }
`;

export const GradientText = styled.span`
    text-align: center;
    background: linear-gradient(90deg, #FF7DFC 62.68%, #429DFF 100%);
    background-clip: text;
    color: transparent;
    font-weight: 800;
`;

export const Divider = styled.div`
    height: 1px;
    width: 100%;
    background: #fff;
    opacity: 0.1;
`;

export const EmailWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
`;

export const EmailForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 348px;
`;

export const EmailInput = styled.input`
    width: 100%;
    height: 40px;
    padding: 25px;
    border: none;
    background: #FFFFFF1A;
    border-radius: 65px;
    font-family: var(--font-poppins), sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: white;
    &::placeholder {
        color: white;
        opacity: 0.6;
        text-align: center;
    }
`;

export const EmailButton = styled.button`
    width: 100%;
    padding: 20px;
    line-height: 100%;
    border-radius: 65px;
    background: #9A0AED;
    border: none;
    font-family: var(--font-poppins), sans-serif;
    font-size: 14px;
    font-weight: 800;
    color: white;

    &:disabled {
        background: #9A0AED;
        opacity: 0.5;
    }
`;

export const FormCopy = styled.div`
    display: flex;
    gap: 6px;
    font-size: 14px;
    justify-content: center;
    flex-wrap: wrap;
    overflow-wrap: anywhere;
`;

export const CaptcahWrapper = styled.div`
    display: flex;
    justify-content: center;
`;
