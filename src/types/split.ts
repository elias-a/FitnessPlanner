import { Exercise } from './exercise';

export interface Split {
  startDate: string;
  endDate: string;
  categories: { [key: string]: string[] };
  exercises: { [key: string]: SplitExercise[] };
}

export interface SplitExercise {
  exercise: Exercise;
  sets: number;
  reps: number;
  isCompleted: boolean;
}
