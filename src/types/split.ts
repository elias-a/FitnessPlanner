import { Exercise } from './exercise';

export interface Split {
  id: string;
  startDate: string;
  endDate: string;
  categories: { [key: string]: string[] };
  exerciseTemplate: SplitExercises;
  exerciseSchedule: SplitExercises;
  color: string;
  isDeleted?: boolean;
}

export interface SplitExercises {
  [key: string]: SplitExercise[];
}

export interface SplitExercise {
  id: string;
  exercise: Exercise;
  sets: number;
  reps: number;
  isSingleArm: boolean;
  isCompleted: boolean;
  superset?: SplitExercise[];
  isDeleted?: boolean;
}

export interface NewSplitExercise
  extends Omit<SplitExercise, 'exercise' | 'isCompleted'> {
  exercise: Exercise | undefined;
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
  exerciseTemplate: SplitExerciseArrayMap[];
  exerciseSchedule: SplitExerciseArrayMap[];
  color: string;
  isDeleted?: boolean;
}
