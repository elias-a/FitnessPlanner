import Realm from 'realm';

export const StringArrayMap: Realm.ObjectSchema = {
  name: 'StringArrayMap',
  embedded: true,
  properties: {
    key: 'string',
    value: 'string[]',
  },
};

export const SplitExerciseArrayMap: Realm.ObjectSchema = {
  name: 'SplitExerciseArrayMap',
  embedded: true,
  properties: {
    key: 'string',
    value: 'SplitExercise[]',
  },
};

export const SplitExercise: Realm.ObjectSchema = {
  name: 'SplitExercise',
  properties: {
    id: 'string',
    exercise: 'Exercise',
    sets: 'int',
    reps: 'int',
    isSingleArm: 'bool',
    isCompleted: 'bool',
    superset: 'SplitExercise[]',
  },
};

export const Split: Realm.ObjectSchema = {
  name: 'Split',
  primaryKey: 'id',
  properties: {
    id: 'string',
    startDate: 'string',
    endDate: 'string',
    categories: 'StringArrayMap[]',
    exerciseTemplate: 'SplitExerciseArrayMap[]',
    exerciseSchedule: 'SplitExerciseArrayMap[]',
    color: 'string',
  },
};
