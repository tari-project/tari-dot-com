import styled from 'styled-components';
const sidebarBreakpoint = 1090;

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100dvh;

    display: flex;

    background-color: #e4e3ec;

    padding: 0 20px;
    padding-top: 200px;
    padding-bottom: 200px;

    @media (max-width: 768px) {
        padding-top: 140px;
        padding-bottom: 60px;
    }
`;

export const Columns = styled.div`
    max-width: 1440px;
    display: flex;
    flex-direction: row;
    gap: 40px;
    align-items: flex-start;
    flex: 1 1 300px;
    margin: 0 auto;

    @media (max-width: 1090px) {
        flex-direction: column;
        gap: 24px;
    }
`;

export const SidebarHolder = styled.div`
    width: 400px;
    position: sticky;
    top: 0;

    @media (max-width: ${sidebarBreakpoint}px) {
        width: 100%;
        position: static;
    }
`;

export const Holder = styled.div`
    min-height: 889px;
    max-width: 867px;
    width: 100%;
    margin: auto;
    font-size: 16px;
    font-weight: 400;
    line-height: 160%;
    font-family: var(--font-poppins), sans-serif;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;

    h1 {
        display: flex;
        align-items: center;
        font-family: var(--font-druk), sans-serif;
        text-transform: uppercase;
        font-weight: 800;
        font-size: 80px;
        line-height: 100%;

        @media (max-width: 768px) {
            font-size: 36px;
        }
    }

    h2 {
        display: flex;
        align-items: center;
        font-weight: 800;
        font-size: 26px;
        line-height: 100%;

        @media (max-width: 768px) {
            font-size: 20px;
        }
    }

    h3,
    h4,
    h5,
    h6 {
        display: flex;
        align-items: center;
    }

    p,
    ul,
    ol {
        margin-bottom: 24px;
    }

    a {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        font-size: 14px;

        p {
            margin-bottom: 20px;
        }
    }
`;

export const TitleHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
`;

export const Explainer = styled.div`
    font-size: 18px;
    margin-bottom: 0;
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

export const Date = styled.div`
    font-size: 14px;
    color: #474747;
`;

export const Image = styled.img`
    width: 100%;
    margin-bottom: 40px;
`;

export const NetworkPillContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

export const NetworkPill = styled.div`
    display: flex;
    min-width: 155px;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: #fff;
    border-radius: 30px;
`;

export const IconWrapper = styled.div`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    margin-right: 12px;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: 32px;
    flex: 0 0 32px;
    svg {
        width: 16px;
        height: 16px;
        fill: #000;
        flex-shrink: 0;
        flex-grow: 0;
        flex-basis: 16px;
        flex: 0 0 16px;
        @media (max-width: 768px) {
            width: 14px;
            height: 14px;
            flex-basis: 14px;
            flex: 0 0 14px;
            flex-shrink: 0;
            flex-grow: 0;
            fill: #000;
        }
    }
`;

export const Note = styled.div<{ $variant: 'default' | 'warning' | 'success' | 'info' }>`
    width: 100%;
    padding: 20px;
    border-radius: 30px;
    border: 2px solid
        ${({ $variant }) =>
            $variant === 'warning'
                ? '#FFB938'
                : $variant === 'success'
                ? '#10C115'
                : $variant === 'info'
                ? '#00AAD9'
                : '#E3E1ED'};
    background-color: ${({ $variant }) =>
        $variant === 'warning'
            ? '#FFF6E5'
            : $variant === 'success'
            ? '#EFFFF0'
            : $variant === 'info'
            ? '#E6F9FE'
            : '#FFF'};
`;

export const NoteDivider = styled.div`
    width: 100%;
    background-color: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    margin: 10px 0;
`;

export const NumberIcon = styled.div`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #111;
    margin-right: 12px;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: 32px;
    flex: 0 0 32px;
    font-size: 16px;
    font-weight: 700;
    color: #b0d636;
`;

export const SectionDivider = styled.div`
    width: 100%;
    background-color: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    margin: 30px 0;
`;
