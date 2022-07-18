import { openRealm } from '../realm';
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

export const getSplits = async (): Promise<Split[]> => {
  const realm = await openRealm();

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
      isDeleted: split.isDeleted,
    });
  });

  return splits;
};

export const createSplit = async (split: Split): Promise<Split> => {
  const realm = await openRealm();

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
      realm,
    );
    const exerciseScheduleArrayMap = createSplitExerciseArray(
      split.exerciseSchedule,
      realm,
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
        isDeleted: split.isDeleted ?? false,
      },
      Realm.UpdateMode.Modified,
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
    isDeleted: newSplit.isDeleted ?? false,
  };
};

export const deleteSplit = async (split: Split): Promise<Split> => {
  const realm = await openRealm();

  realm.write(() => {
    const splitObject = realm.objectForPrimaryKey('Split', split.id);
    realm.delete(splitObject);
  });

  // TODO: Get verification the object was deleted.
  return split;
};

export const updateSplitExercises = async (
  id: string,
  splitExercises: SplitExercises,
) => {
  const realm = await openRealm();

  const updatedSplit: any = realm.write(() => {
    const splitExerciseArray = createSplitExerciseArray(splitExercises, realm);

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
  realm: Realm,
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
