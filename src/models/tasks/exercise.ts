import realm from '../realm';
import { Exercise } from '../../types/exercise';

export const getExercises = (): Exercise[] => {
  const exercises = JSON.parse(JSON.stringify(realm.objects('Exercise')));
  console.log(exercises);
  return exercises;
};

export const addExercise = (exercise: Exercise): Exercise => {
  const newExercise = realm.write(() => {
    const createdExercise: Exercise = realm.create('Exercise', {
      id: exercise.id,
      name: exercise.name,
      categories: exercise.categories,
    });

    return createdExercise;
  });

  return {
    id: newExercise.id,
    name: newExercise.name,
    categories: JSON.parse(JSON.stringify(newExercise.categories)),
  };
};

export const deleteExercise = (exercise: Exercise): Exercise => {
  realm.write(() => {
    realm.delete(exercise);
  });

  // TODO: Get verification the object was deleted.
  return exercise;
};
