export interface CalendarRange {
  startRange: Date;
  endRange: Date;
  color: string;
}

export type SelectedDates = [Date | undefined, Date | undefined];

export interface CalendarData {
  key: string;
  type: string;
  data: string | Date;
  index?: number;
}
