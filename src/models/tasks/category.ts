import { openRealm } from '../realm';
import { Category } from '../../types/category';
import { parseJson } from '../../utils/parseJson';

export const getCategories = async (): Promise<Category[]> => {
  const realm = await openRealm();

  const categories = parseJson(realm.objects('Category'));
  return categories;
};

export const addCategory = async (
  category: Category,
  editing: boolean,
): Promise<Category> => {
  const realm = await openRealm();

  const newCategory = realm.write(() => {
    const createdCategory: Category = realm.create(
      // This seems to be an issue with `realm.create` types.
      // @ts-ignore
      'Category',
      {
        id: category.id,
        name: category.name,
        subCategories: category.subCategories,
      },
      editing ? Realm.UpdateMode.Modified : Realm.UpdateMode.Never,
    );

    return createdCategory;
  });

  return {
    id: newCategory.id,
    name: newCategory.name,
    subCategories: parseJson(newCategory.subCategories),
  };
};

export const deleteCategory = async (category: Category): Promise<Category> => {
  const realm = await openRealm();

  realm.write(() => {
    const categoryObject = realm.objectForPrimaryKey('Category', category.id);
    realm.delete(categoryObject);
  });

  // TODO: Get verification the object was deleted.
  return category;
};
