import type { Split, SplitExercise, SplitExercises } from '../types/split';
import type { Exercise } from '../types/exercise';
import uuid from 'react-native-uuid';
import { getDayKey } from '../utils/getDayKey';
import { compareDates } from '../utils/compareDates';

export const buildSplitTemplate = (
  split: Split,
  exercises: Exercise[],
): { [key: string]: SplitExercise[] } => {
  const selectedExercises: { [key: string]: Exercise[] } = {};
  const splitExercises: { [key: string]: SplitExercise[] } = {};

  Object.keys(split.categories).forEach(day => {
    const associatedExercises: Exercise[] = [];

    split.categories[day].forEach(category => {
      // Find all exercises associated with `category`.
      exercises.forEach(exercise => {
        if (exercise.categories.includes(category)) {
          associatedExercises.push(exercise);
        }
      });
    });

    // Select 4 random exercises.
    selectedExercises[day] = associatedExercises
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    Object.keys(selectedExercises).forEach(key => {
      const daySplitExercises: SplitExercise[] = selectedExercises[key].map(
        exercise => {
          return {
            id: uuid.v4().toString(),
            exercise: exercise,
            sets: 3,
            reps: 10,
            isSingleArm: false,
            isCompleted: false,
          };
        },
      );

      splitExercises[key] = daySplitExercises;
    });
  });

  return splitExercises;
};

export const templateToSchedule = (
  template: SplitExercises,
  schedule: SplitExercises,
  startDate: string,
  endDate: string,
  editing: boolean,
): SplitExercises => {
  const newSchedule: SplitExercises = { ...schedule };
  const start = new Date(startDate);
  const end = new Date(endDate);

  let date = new Date(startDate);
  date.setHours(0, 0, 0, 0);

  // If the split is being edited, do not update
  // days before today.
  if (editing) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (compareDates(today, date) === 1) {
      date = today;
    }
  }

  while (compareDates(date, end) < 1) {
    const key = getDayKey(date, start);
    if (Object.keys(template).includes(key)) {
      newSchedule[date.toString()] = template[key].map(e => {
        return {
          ...e,
          id: uuid.v4().toString(),
          isCompleted: false,
        };
      });
    }

    newSchedule[date.toString()] = template[key] ?? [];

    date.setDate(date.getDate() + 1);
  }

  return newSchedule;
};

export const selectExercises = (
  categories: string[],
  exercises: Exercise[],
): SplitExercise[] => {
  const associatedExercises: Exercise[] = [];

  // Find all exercises associated with the categories.
  exercises.forEach(exercise => {
    categories.forEach(category => {
      if (exercise.categories.includes(category)) {
        associatedExercises.push(exercise);
      }
    });
  });

  // Select 4 random exercises.
  const selectedExercises = associatedExercises
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const splitExercises: SplitExercise[] = selectedExercises.map(exercise => {
    return {
      id: uuid.v4().toString(),
      exercise: exercise,
      sets: 3,
      reps: 10,
      isSingleArm: false,
      isCompleted: false,
    };
  });

  return splitExercises;
};
