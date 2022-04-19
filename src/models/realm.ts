import Realm from 'realm';
import Category from './schema/category';
import Exercise from './schema/exercise';

export default new Realm({
  schema: [Category, Exercise],
});
