import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Stack } from './index';
import { useQuery } from 'react-query';
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} from '../../hooks/category';
import { getCategories } from '../../models/tasks/category';
import Glossary from './Glossary';
import CategoryForm from './CategoryForm';
import type { Category } from '../../types/category';

const initialCategory: Category = {
  id: '',
  name: '',
  subCategories: [],
};

type ViewCategoriesProps = NativeStackScreenProps<Stack, 'ViewExercises'>;

const ViewCategories: React.FC<ViewCategoriesProps> = ({ navigation }) => {
  const categories = useQuery('categories', getCategories);
  const addMutation = useAddCategoryMutation();
  const deleteMutation = useDeleteCategoryMutation();

  return (
    <Glossary
      initialItem={initialCategory}
      items={categories}
      title={'Categories'}
      modalForm={CategoryForm}
      textExtractor={item => item.name}
      goBack={() => navigation.goBack()}
      addMutation={addMutation}
      deleteMutation={deleteMutation}
    />
  );
};

export default ViewCategories;
