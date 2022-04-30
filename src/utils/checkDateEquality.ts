export const checkDateEquality = (date1: Date, date2: Date) => {
  const areEqual =
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
  return areEqual;
};
