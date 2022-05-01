import type { Split, SplitExercise } from '../types/split';
import type { Exercise } from '../types/exercise';

export const buildSplit = (
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
            exercise: exercise,
            sets: 3,
            reps: 10,
            isCompleted: false,
          };
        },
      );

      splitExercises[key] = daySplitExercises;
    });
  });

  return splitExercises;
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
      exercise: exercise,
      sets: 3,
      reps: 10,
      isCompleted: false,
    };
  });

  return splitExercises;
};
