import type { CalendarRange } from '../types/calendar';

export const isDateInRange = (date: Date, ranges: CalendarRange[]): string => {
  for (const range of ranges) {
    const { startRange, endRange, color } = range;
    if (date >= startRange && date <= endRange) {
      return color;
    }
  }

  return '';
};
