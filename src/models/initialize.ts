import type { Category } from '../types/category';
import type { Exercise } from '../types/exercise';
import uuid from 'react-native-uuid';
import CategorySchema from './schema/category';
import ExerciseSchema from './schema/exercise';
import {
  Split,
  SplitExercise,
  StringArrayMap,
  SplitExerciseArrayMap,
} from './schema/split';

const categoryNames: string[] = [
  'Back',
  'Biceps',
  'Chest',
  'Triceps',
  'Shoulders',
  'Legs',
  'Glutes',
  'Hamstrings',
  'Quads',
  'Calves',
];

const categoryLookup: { [key: string]: string } = {};
const categories: Category[] = categoryNames.map(name => {
  const id = uuid.v4().toString();
  categoryLookup[name] = id;

  return {
    id: id,
    name: name,
  };
});

const exerciseData: { name: string; categoryName: string }[] = [
  { name: 'Lat Pulldowns', categoryName: 'Back' },
  { name: 'Bicep Curls', categoryName: 'Biceps' },
  { name: 'Hammer Curls', categoryName: 'Biceps' },
  { name: 'Arnold Press', categoryName: 'Shoulders' },
  { name: 'Rear Delt Fly', categoryName: 'Back' },
  { name: 'Preacher Curls', categoryName: 'Biceps' },
  { name: 'Waiter Curls', categoryName: 'Biceps' },
  { name: 'Shoulder Press', categoryName: 'Shoulders' },
  { name: 'Overhead Press', categoryName: 'Shoulders' },
  { name: 'Upright Row', categoryName: 'Shoulders' },
  { name: 'Chest-Supported Row', categoryName: 'Back' },
  { name: 'Bent-Over Row', categoryName: 'Back' },
  { name: 'Back Squats', categoryName: 'Legs' },
  { name: 'Front Squats', categoryName: 'Legs' },
  { name: 'Bulgarian Split Squats', categoryName: 'Legs' },
  { name: 'Romanian Deadlifts', categoryName: 'Hamstrings' },
  { name: 'Standard Deadlift', categoryName: 'Back' },
  { name: 'KAS Glute Bridges', categoryName: 'Glutes' },
  { name: 'Hip Thrusts', categoryName: 'Glutes' },
  { name: 'Goblet Squats', categoryName: 'Legs' },
  { name: 'Lunges', categoryName: 'Legs' },
  { name: 'Tricep Kickbacks', categoryName: 'Triceps' },
  { name: 'Tricep Cable Pulldowns', categoryName: 'Triceps' },
  { name: 'Overhead Tricep Extensions', categoryName: 'Triceps' },
  { name: 'Bench Press', categoryName: 'Chest' },
  { name: 'Incline Press', categoryName: 'Chest' },
  { name: 'Narrow Press', categoryName: 'Chest' },
  { name: 'Chest Flies', categoryName: 'Chest' },
  { name: 'Reverse Flies', categoryName: 'Back' },
  { name: 'Dumbbell Pullover', categoryName: 'Chest' },
];

const exercises: Exercise[] = exerciseData.map(data => {
  return {
    id: uuid.v4().toString(),
    name: data.name,
    categories: [categoryLookup[data.categoryName]],
  };
});

Realm.open({
  schema: [
    CategorySchema,
    ExerciseSchema,
    Split,
    SplitExercise,
    StringArrayMap,
    SplitExerciseArrayMap,
  ],
  path: 'app.realm',
}).then(realm => {
  realm.write(() => {
    categories.forEach(category => {
      realm.create('Category', {
        id: category.id,
        name: category.name,
        subCategories: [],
        isDeleted: false,
      });
    });

    exercises.forEach(exercise => {
      realm.create('Exercise', {
        id: exercise.id,
        name: exercise.name,
        categories: exercise.categories,
        isDeleted: false,
      });
    });
  });
});
