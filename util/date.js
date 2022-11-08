export function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate();
    return `${day}-${month}-${year}`;
}

export const getDateMinusDays = (date, days) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}