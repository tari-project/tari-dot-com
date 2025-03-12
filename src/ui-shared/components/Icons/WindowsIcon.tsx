interface Props {
    fill: string;
}

export default function WindowsIcon({ fill }: Props) {
    const icon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 10.3616H8.92857V17.5536L20 19V10.3616ZM8.21429 10.3616H0V16.3884L8.21429 17.4612V10.3616ZM20 1L8.92857 2.42232V9.71875H20V1ZM8.21429 2.51473L0 3.57143V9.71875H8.21429V2.51473Z"
                fill={fill}
            />
        </svg>
    );

    return icon;
}
