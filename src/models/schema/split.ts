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
  embedded: true,
  properties: {
    exercise: 'Exercise',
    sets: 'int',
    reps: 'int',
    isCompleted: 'bool',
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
    exercises: 'SplitExerciseArrayMap[]',
  },
};