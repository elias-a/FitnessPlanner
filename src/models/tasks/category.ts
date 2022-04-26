import realm from '../realm';
import { Category } from '../../types/category';
import { parseJson } from '../../utils/parseJson';

export const getCategories = (): Category[] => {
  const categories = parseJson(realm.objects('Category'));
  return categories;
};

export const addCategory = (category: Category, editing: boolean): Category => {
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

export const deleteCategory = (category: Category): Category => {
  realm.write(() => {
    const categoryObject = realm.objectForPrimaryKey('Category', category.id);
    realm.delete(categoryObject);
  });

  // TODO: Get verification the object was deleted.
  return category;
};
