import Realm from 'realm';

class Category extends Realm.Object {
  public id!: string;
  public name!: string;
  public subCategories!: Realm.List<Category>;

  public static schema: Realm.ObjectSchema = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      subCategories: 'Category[]',
      isDeleted: 'bool',
    },
  };
}

export default Category;
