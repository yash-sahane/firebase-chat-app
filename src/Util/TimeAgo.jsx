export const calculateTimeAgo = (timestamp) => {
    const now = new Date();
    const messageTime = timestamp?.toDate();
    const timeDifference = now - messageTime;

    // Calculate time difference in various units
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const monthsDifference = Math.floor(daysDifference / 30);

    if (monthsDifference > 0) {
        return `${monthsDifference} ${monthsDifference === 1 ? 'month' : 'months'} ago`;
    } else if (daysDifference > 0) {
        return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
    } else if (hoursDifference > 0) {
        return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutesDifference > 0) {
        return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
    } else {
        return 'Just now';
    }
};
