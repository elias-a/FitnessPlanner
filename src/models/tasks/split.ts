import realm from '../realm';
import type {
  Split,
  SplitExercise,
  StringArrayMap,
  SplitExerciseArrayMap,
  SplitObject,
} from '../../types/split';
import type { Exercise } from '../../types/exercise';
import { parseJson } from '../../utils/parseJson';

export const getSplits = (): Split[] => {
  const splitObjects: SplitObject[] = parseJson(realm.objects('Split'));
  const splits: Split[] = [];
  splitObjects.forEach(split => {
    const { categories, exercises } = convertSplit(split);

    splits.push({
      id: split.id,
      startDate: split.startDate,
      endDate: split.endDate,
      categories: categories,
      exercises: exercises,
    });
  });

  return splits;
};

export const createSplit = (split: Split): Split => {
  const newSplit = realm.write(() => {
    const stringArrayMap: StringArrayMap[] = Object.keys(split.categories).map(
      day => {
        return {
          key: day,
          value: split.categories[day],
        };
      },
    );

    const splitExerciseArrayMap: SplitExerciseArrayMap[] = Object.keys(
      split.exercises,
    ).map(day => {
      const splitExercises: SplitExercise[] = [];
      split.exercises[day].forEach(splitExercise => {
        const exerciseObject: Exercise | undefined = realm.objectForPrimaryKey(
          'Exercise',
          splitExercise.exercise.id,
        );

        if (exerciseObject) {
          splitExercises.push({
            ...splitExercise,
            exercise: exerciseObject,
          });
        }
      });
      return {
        key: day,
        value: splitExercises,
      };
    });

    const createdSplit: SplitObject = realm.create('Split', {
      id: split.id,
      startDate: split.startDate,
      endDate: split.endDate,
      categories: stringArrayMap,
      exercises: splitExerciseArrayMap,
    });

    return createdSplit;
  });

  const { categories, exercises } = convertSplit(newSplit);

  return {
    id: newSplit.id,
    startDate: newSplit.startDate,
    endDate: newSplit.endDate,
    categories: categories,
    exercises: exercises,
  };
};

const convertSplit = (split: SplitObject) => {
  const categories: { [key: string]: string[] } = {};
  const newStringArrayMap: StringArrayMap[] = parseJson(split.categories);
  newStringArrayMap.forEach(({ key, value }) => {
    categories[key] = value;
  });

  const exercises: { [key: string]: SplitExercise[] } = {};
  const newSplitExerciseArrayMap: SplitExerciseArrayMap[] = parseJson(
    split.exercises,
  );
  newSplitExerciseArrayMap.forEach(({ key, value }) => {
    exercises[key] = value;
  });

  return { categories, exercises };
};
