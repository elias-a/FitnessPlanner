export interface Split {
  days: number;
  weeks: number;
  categories: { [key: string]: string[] };
  exercises: { [key: string]: string[] };
}
