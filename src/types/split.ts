import type { Category } from './category';

export interface Split {
  startDate: string;
  endDate: string;
  categories: { [key: string]: Category[] };
  exercises: { [key: string]: string[] };
}
