export const getDayKey = (dateTime1: Date, dateTime2: Date) => {
  const date1 = new Date(dateTime1);
  const date2 = new Date(dateTime2);
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  const dayDifference = Math.ceil(
    (date1.getTime() - date2.getTime()) / 1000 / 86400,
  );

  const day = (dayDifference % 7) + 1;
  return day.toString();
};
