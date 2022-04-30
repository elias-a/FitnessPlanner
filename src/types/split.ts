import { Exercise } from './exercise';

export interface Split {
  id: string;
  startDate: string;
  endDate: string;
  categories: { [key: string]: string[] };
  exercises: { [key: string]: SplitExercise[] };
  color: string;
}

export interface SplitExercise {
  exercise: Exercise;
  sets: number;
  reps: number;
  isCompleted: boolean;
}

export interface StringArrayMap {
  key: string;
  value: string[];
}

export interface SplitExerciseArrayMap {
  key: string;
  value: SplitExercise[];
}

export interface SplitObject {
  id: string;
  startDate: string;
  endDate: string;
  categories: StringArrayMap[];
  exercises: SplitExerciseArrayMap[];
  color: string;
}
