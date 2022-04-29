import { Split } from '../types/split';

// Checks if the input start and end dates overlap with
// any other split.
export const checkDateOverlap = (
  startDate: Date,
  endDate: Date,
  splits: Split[],
): Split | undefined => {
  for (const split of splits) {
    const splitStartDate = new Date(split.startDate);
    const splitEndDate = new Date(split.endDate);

    // Input start date is after the split's start date, and
    // input end date is before the split's end date.
    if (startDate >= splitStartDate && endDate <= splitEndDate) {
      return split;
    }

    // Input start date is before the split's start date, and
    // input end date is after the split's end date.
    if (startDate <= splitStartDate && endDate >= splitEndDate) {
      return split;
    }

    // Input start date is between the split's start and end dates.
    if (startDate >= splitStartDate && startDate <= splitEndDate) {
      return split;
    }

    // Input end date is between the split's start and end dates.
    if (endDate >= splitStartDate && endDate <= splitEndDate) {
      return split;
    }
  }

  return undefined;
};
