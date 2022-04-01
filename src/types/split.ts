export interface Split {
  startDate: string;
  endDate: string;
  categories: { [key: string]: string[] };
  exercises: { [key: string]: string[] };
}
