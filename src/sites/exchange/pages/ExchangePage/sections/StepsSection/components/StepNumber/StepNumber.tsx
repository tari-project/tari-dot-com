import { Wrapper, Number } from './styles';

interface Props {
    text: string;
}

export default function StepNumber({ text }: Props) {
    return (
        <Wrapper>
            <Number>{text}</Number>
            <svg width="146" height="93" viewBox="0 0 146 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M120 46.9994C120 58.0451 111.046 66.9994 100 66.9994L19.5 66.9994C8.4543 66.9994 -0.499999 75.9537 -0.5 86.9994L-0.5 92.5001L-0.500022 -0.000424751L145.5 -0.000427246L140 -0.000427727C128.954 -0.000428693 120 8.95388 120 19.9996L120 46.9994Z"
                    fill="#161616"
                />
            </svg>
        </Wrapper>
    );
}
