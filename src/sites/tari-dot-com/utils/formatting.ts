export const timeAgo = (timestamp: string): string => {
    const now = Date.now();
    const timeInMilliseconds = new Date(timestamp + ' UTC').getTime();
    const difference = now - timeInMilliseconds;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''}`;
    return `${seconds} sec${seconds > 1 ? 's' : ''}`;
};
