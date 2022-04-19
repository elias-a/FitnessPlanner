import realm from './realm';
import { Category } from '../types/category';

export const getCategories = (): Category[] => {
  const categories = JSON.parse(JSON.stringify(realm.objects('Category')));
  console.log(categories);
  return categories;
};

export const addCategory = (category: Category): Category => {
  const newCategory = realm.write(() => {
    const createdCategory: Category = realm.create('Category', {
      id: category.id,
      name: category.name,
      subCategories: category.subCategories,
    });

    return createdCategory;
  });

  return {
    id: newCategory.id,
    name: newCategory.name,
    subCategories: JSON.parse(JSON.stringify(newCategory.subCategories)),
  };
};
