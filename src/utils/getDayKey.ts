export const getDayKey = (date1: Date, date2: Date) => {
  const dayDifference = Math.ceil(
    (date1.getTime() - date2.getTime()) / 1000 / 86400,
  );

  let day = dayDifference % 7;
  day = day === 0 ? 7 : day;

  return day.toString();
};
