import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import { useQuery } from 'react-query';
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} from '../../hooks/category';
import { getCategories } from '../../models/tasks/category';
import CategoryModal from '../Modals/Category';
import Glossary from './Glossary';
import type { Category } from '../../types/category';
import uuid from 'react-native-uuid';

type ViewCategoriesProps = NativeStackScreenProps<Stack, 'ViewExercises'>;

const ViewCategories: React.FC<ViewCategoriesProps> = ({ navigation }) => {
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Category>();
  const categories = useQuery('categories', getCategories);
  const addMutation = useAddCategoryMutation();
  const deleteMutation = useDeleteCategoryMutation();

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(true);
  };

  const handleRemove = (category: Category) => {
    addMutation.mutate({
      category: {
        ...category,
        isDeleted: true,
      },
      editing: true,
    });
  };

  const handleUndoRemove = (category: Category) => {
    addMutation.mutate({
      category: {
        ...category,
        isDeleted: false,
      },
      editing: true,
    });
  };

  const saveCategory = (category: Category, editing: boolean) => {
    delete category.isDeleted;

    addMutation.mutate({
      category: {
        ...category,
        id: editing ? category.id : uuid.v4().toString(),
      },
      editing: editing,
    });

    closeCategoryModal();
  };

  const closeCategoryModal = () => {
    setIsCategoryOpen(false);
    setSelectedCategory(undefined);
  };

  return (
    <Glossary
      items={categories}
      modal={
        <CategoryModal
          isOpen={isCategoryOpen}
          onCancel={closeCategoryModal}
          onSave={saveCategory}
          selectedCategory={selectedCategory}
        />
      }
      title={'Categories'}
      textExtractor={item => item.name}
      goBack={() => navigation.goBack()}
      clickAdd={() => setIsCategoryOpen(true)}
      handleEdit={handleEdit}
      handleRemove={handleRemove}
      handleUndoRemove={handleUndoRemove}
    />
  );
};

export default ViewCategories;
