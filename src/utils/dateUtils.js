export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based, so add 1
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
}
