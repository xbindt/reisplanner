export const transformToReadableDate = (date) => {
    const nwDate = new Date(date);
    const minutes =  (nwDate.getMinutes() < 10 ? '0' : '') + nwDate.getMinutes();
    return `${nwDate.getHours()} : ${minutes}`;
}

export const transformToReadableDelay = (actual, planned) => {
   const delay = Math.ceil((new Date(actual) - new Date(planned))/60000);
   return delay > 0 ? `+ ${delay}` : '';
}

export const minutesToHoursAndMinutes = (n) => {
    const num = n;
    const hours = (num / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return `${rhours}:${rminutes}` ;
}