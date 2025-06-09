interface Props {
    width?: string | number;
    height?: string | number;
    fill?: string;
    title?: string;
}
export const GasIcon = ({ width = '30', title = 'Gas' }: Props) => {
    return <svg fill="none" stroke-width="8" viewBox="0 0 17 16" width={width} xmlns="http://www.w3.org/2000/svg">
        {title && <title>{title}</title>}
        <path fill="currentColor" fill-rule="evenodd" d="M10.705.186a.667.667 0 0 1 .943.02l2.831 2.952c.183.159.336.35.452.565.134.232.236.51.236.828v6.916a1.866 1.866 0 1 1-3.734 0V9.933a.667.667 0 0 0-.666-.666H10.5V14a1.335 1.335 0 0 1-1.333 1.333H3.833A1.332 1.332 0 0 1 2.5 14V2.667a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5.266h.267a2 2 0 0 1 2 2v1.534a.533.533 0 0 0 1.066 0V6.553a2 2 0 0 1-1.499-3.705l-1.649-1.72a.667.667 0 0 1 .02-.942Zm2.868 3.952a.667.667 0 1 0 .191.233 1.47 1.47 0 0 0-.19-.233ZM4.5 9.333a.667.667 0 0 0 0 1.334h4a.667.667 0 0 0 0-1.334h-4ZM4.5 12a.667.667 0 0 0 0 1.333h4A.667.667 0 1 0 8.5 12h-4Z" clip-rule="evenodd" />
    </svg>
}
