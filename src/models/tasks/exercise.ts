import { openRealm } from '../realm';
import { Exercise } from '../../types/exercise';
import { parseJson } from '../../utils/parseJson';

export const getExercises = async (): Promise<Exercise[]> => {
  const realm = await openRealm();

  const exercises = parseJson(realm.objects('Exercise'));
  return exercises;
};

export const addExercise = async (
  exercise: Exercise,
  editing: boolean,
): Promise<Exercise> => {
  const realm = await openRealm();

  const newExercise = realm.write(() => {
    const createdExercise: Exercise = realm.create(
      // This seems to be an issue with `realm.create` types.
      // @ts-ignore
      'Exercise',
      {
        id: exercise.id,
        name: exercise.name,
        categories: exercise.categories,
        isDeleted: exercise.isDeleted ?? false,
      },
      editing ? Realm.UpdateMode.Modified : Realm.UpdateMode.Never,
    );

    return createdExercise;
  });

  return {
    id: newExercise.id,
    name: newExercise.name,
    categories: parseJson(newExercise.categories),
    isDeleted: newExercise.isDeleted ?? false,
  };
};

export const deleteExercise = async (exercise: Exercise): Promise<Exercise> => {
  const realm = await openRealm();

  realm.write(() => {
    const exerciseObject = realm.objectForPrimaryKey('Exercise', exercise.id);
    realm.delete(exerciseObject);
  });

  // TODO: Get verification the object was deleted.
  return exercise;
};
