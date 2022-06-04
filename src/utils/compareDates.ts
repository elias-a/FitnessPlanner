export const compareDates = (dateTime1: Date, dateTime2: Date) => {
  const date1 = new Date(dateTime1);
  const date2 = new Date(dateTime2);
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  if (date1 > date2) {
    return 1;
  } else if (date1 === date2) {
    return 0;
  } else {
    return -1;
  }
};
