import Realm from 'realm';
import Category from './schema/category';
import Exercise from './schema/exercise';
import {
  Split,
  SplitExercise,
  StringArrayMap,
  SplitExerciseArrayMap,
} from './schema/split';

export default new Realm({
  schema: [
    Category,
    Exercise,
    Split,
    SplitExercise,
    StringArrayMap,
    SplitExerciseArrayMap,
  ],
});
