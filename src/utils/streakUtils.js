// returns today's date in YYYY-MM-DD format
export const getToday = () => {
    return new Date().toISOString().split("T")[0];
}

// return the number of days between two dates
export const getDayDifference = (lastDate, currentDate) => {
    const last = new Date(lastDate);
    const current = new Date(currentDate);
    const diff = current - last;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}