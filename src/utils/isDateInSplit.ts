import type { Split } from '../types/split';

export const isDateInSplit = (
  date: Date,
  splits: Split[],
): Split | undefined => {
  for (const split of splits) {
    const startDate = new Date(split.startDate);
    const endDate = new Date(split.endDate);
    if (date >= startDate && date <= endDate) {
      return split;
    }
  }

  return undefined;
};
