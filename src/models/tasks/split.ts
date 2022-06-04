import realm from '../realm';
import type {
  Split,
  SplitExercises,
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
    const { categories, exerciseTemplate, exerciseSchedule } =
      convertSplit(split);

    splits.push({
      id: split.id,
      startDate: split.startDate,
      endDate: split.endDate,
      categories: categories,
      exerciseTemplate: exerciseTemplate,
      exerciseSchedule: exerciseSchedule,
      color: split.color,
    });
  });

  return splits;
};

export const createSplit = (split: Split, editing: boolean): Split => {
  const newSplit = realm.write(() => {
    const stringArrayMap: StringArrayMap[] = Object.keys(split.categories).map(
      day => {
        return {
          key: day,
          value: split.categories[day],
        };
      },
    );

    const exerciseTemplateArrayMap = createSplitExerciseArray(
      split.exerciseTemplate,
    );
    const exerciseScheduleArrayMap = createSplitExerciseArray(
      split.exerciseSchedule,
    );

    const createdSplit: SplitObject = realm.create(
      // This seems to be an issue with `realm.create` types.
      // @ts-ignore
      'Split',
      {
        id: split.id,
        startDate: split.startDate,
        endDate: split.endDate,
        categories: stringArrayMap,
        exerciseTemplate: exerciseTemplateArrayMap,
        exerciseSchedule: exerciseScheduleArrayMap,
        color: split.color,
      },
      editing ? Realm.UpdateMode.Modified : Realm.UpdateMode.Never,
    );

    return createdSplit;
  });

  const { categories, exerciseTemplate, exerciseSchedule } =
    convertSplit(newSplit);

  return {
    id: newSplit.id,
    startDate: newSplit.startDate,
    endDate: newSplit.endDate,
    categories: categories,
    exerciseTemplate: exerciseTemplate,
    exerciseSchedule: exerciseSchedule,
    color: newSplit.color,
  };
};

export const deleteSplit = (split: Split): Split => {
  realm.write(() => {
    const splitObject = realm.objectForPrimaryKey('Split', split.id);
    realm.delete(splitObject);
  });

  // TODO: Get verification the object was deleted.
  return split;
};

export const updateSplitExercises = (
  id: string,
  splitExercises: SplitExercises,
) => {
  const updatedSplit: any = realm.write(() => {
    const splitExerciseArray = createSplitExerciseArray(splitExercises);

    const split = realm.create(
      'Split',
      {
        id: id,
        exerciseSchedule: splitExerciseArray,
      },
      Realm.UpdateMode.Modified,
    );

    return split;
  });

  const { exerciseSchedule } = convertSplit(updatedSplit);

  return exerciseSchedule;
};

const createSplitExerciseArray = (
  splitExercises: SplitExercises,
): SplitExerciseArrayMap[] => {
  return Object.keys(splitExercises).map(day => {
    const splitExercisesArray: SplitExercise[] = [];
    splitExercises[day].forEach(splitExercise => {
      const exerciseObject: Exercise | undefined = realm.objectForPrimaryKey(
        'Exercise',
        splitExercise.exercise.id,
      );

      if (exerciseObject) {
        splitExercisesArray.push({
          ...splitExercise,
          exercise: exerciseObject,
        });
      }
    });
    return {
      key: day,
      value: splitExercisesArray,
    };
  });
};

const convertSplit = (split: SplitObject) => {
  const categories: { [key: string]: string[] } = {};
  const newStringArrayMap: StringArrayMap[] = parseJson(split.categories);
  newStringArrayMap.forEach(({ key, value }) => {
    categories[key] = value;
  });

  const exerciseTemplate: SplitExercises = {};
  const exerciseTemplateArrayMap: SplitExerciseArrayMap[] = parseJson(
    split.exerciseTemplate,
  );
  exerciseTemplateArrayMap.forEach(({ key, value }) => {
    exerciseTemplate[key] = [...value];
  });

  const exerciseSchedule: SplitExercises = {};
  const exerciseScheduleArrayMap: SplitExerciseArrayMap[] = parseJson(
    split.exerciseSchedule,
  );
  exerciseScheduleArrayMap.forEach(({ key, value }) => {
    exerciseSchedule[key] = [...value];
  });

  return { categories, exerciseTemplate, exerciseSchedule };
};
