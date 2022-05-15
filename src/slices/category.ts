import { createSlice } from '@reduxjs/toolkit';
import type { Category } from '../types/category';
import {
  getCategories as getCategoriesTask,
  addCategory as addCategoryTask,
  deleteCategory as deleteCategoryTask,
} from '../models/tasks/category';

const initialCategories: Category[] = [];

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: initialCategories,
  },
  reducers: {
    getCategories: (state, _action: {}) => {
      state.categories = getCategoriesTask();
    },
    addCategory: (
      state,
      action: { payload: { category: Category; editing: boolean } },
    ) => {
      const { category, editing } = action.payload;
      const newCategory = addCategoryTask(category, editing);

      if (editing) {
        state.categories = state.categories.map(el => {
          if (el.id === newCategory.id) {
            return { ...newCategory };
          } else {
            return { ...el };
          }
        });
      } else {
        state.categories.push({ ...newCategory });
      }
    },
    deleteCategory: (state, action: { payload: Category }) => {
      const category = deleteCategoryTask(action.payload);
      state.categories = state.categories.filter(el => el.id !== category.id);
    },
  },
});

export const { addCategory, getCategories, deleteCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
