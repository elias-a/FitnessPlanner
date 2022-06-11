import Realm from 'realm';
import Category from './schema/category';
import Exercise from './schema/exercise';
import {
  Split,
  SplitExercise,
  StringArrayMap,
  SplitExerciseArrayMap,
} from './schema/split';

export const openRealm = async () => {
  Realm.copyBundledRealmFiles();

  const realm = await Realm.open({
    schema: [
      Category,
      Exercise,
      Split,
      SplitExercise,
      StringArrayMap,
      SplitExerciseArrayMap,
    ],
    path: 'app.realm',
  });

  return realm;
};
