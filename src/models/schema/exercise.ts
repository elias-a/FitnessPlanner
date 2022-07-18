import Realm from 'realm';
import Category from './category';

class Exercise extends Realm.Object {
  public id!: string;
  public name!: string;
  public categories!: Realm.List<Category>;

  public static schema: Realm.ObjectSchema = {
    name: 'Exercise',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      categories: 'string[]',
      isDeleted: 'bool',
    },
  };
}

export default Exercise;
