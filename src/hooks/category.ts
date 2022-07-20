import { useMutation } from 'react-query';
import { queryClient } from '../App';
import { addCategory, deleteCategory } from '../models/tasks/category';
import type { Category } from '../types/category';

export const useAddCategoryMutation = () =>
  useMutation<Category, unknown, { item: Category; editing: boolean }, unknown>(
    data => {
      return addCategory(data.item, data.editing);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );

export const useDeleteCategoryMutation = () =>
  useMutation<Category, unknown, { item: Category }, unknown>(
    data => {
      return deleteCategory(data.item);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );
