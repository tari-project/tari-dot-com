interface Props {
    width?: string | number;
    height?: string | number;
    fill?: string;
    title?: string;
}
export const CopyIcon = ({ width = '30', height = '30', title = 'Chevron' }: Props) => {
    return (<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {title && <title>{title}</title>}
        <path fill="#000" fill-rule="evenodd" d="M3.936 1.125H11.533a2.537 2.537 0 0 1 2.53 2.53v.013l-.006.27h.252a2.566 2.566 0 0 1 2.566 2.566v7.805a2.566 2.566 0 0 1-2.566 2.566H6.504a2.566 2.566 0 0 1-2.566-2.566v-.246h-.283a2.537 2.537 0 0 1-2.53-2.53V3.936a2.82 2.82 0 0 1 2.81-2.811Zm1.127 13.184c0 .796.645 1.441 1.44 1.441h7.806c.796 0 1.441-.645 1.441-1.441V6.504c0-.796-.645-1.441-1.441-1.441H6.504c-.796 0-1.441.645-1.441 1.44v7.806Zm7.869-10.371H6.503a2.566 2.566 0 0 0-2.566 2.566v6.434h-.28A1.412 1.412 0 0 1 2.25 11.53V3.938A1.694 1.694 0 0 1 3.938 2.25h7.592a1.412 1.412 0 0 1 1.408 1.402l-.007.285Z" clip-rule="evenodd" />
    </svg>
    );
}  
