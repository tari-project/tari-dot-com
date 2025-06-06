export const truncateMiddle = (str: string, num: number, startNum?:number): string => {
    if (str.length <= num) return str;
    const end = str.substring(str.length - num);
    const start = str.substring(0, startNum || num);
    return start + '...' + end;
};

