import type { Split } from '../types/split';
import type { Exercise } from '../types/exercise';

export const buildSplit = (
  split: Split,
  exercises: Exercise[],
): { [key: string]: string[] } => {
  const selectedExercises: { [key: string]: string[] } = {};

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
      .slice(0, 4)
      .map(exercise => exercise.id);
  });

  return selectedExercises;
};
