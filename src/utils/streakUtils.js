export const getToday = () => {
    return new Date().toISOString().split("T")[0];
}

export const getDayDifference = (lastDate, currentDate) => {
    const last = new Date(lastDate);
    const current = new Date(currentDate);
    const diff = current - last;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}