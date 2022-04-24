import realm from '../realm';
import { Exercise } from '../../types/exercise';
import { parseJson } from '../../utils/parseJson';

export const getExercises = (): Exercise[] => {
  const exercises = parseJson(realm.objects('Exercise'));
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
    categories: parseJson(newExercise.categories),
  };
};

export const deleteExercise = (exercise: Exercise): Exercise => {
  realm.write(() => {
    const exerciseObject = realm.objectForPrimaryKey('Exercise', exercise.id);
    realm.delete(exerciseObject);
  });

  // TODO: Get verification the object was deleted.
  return exercise;
};
