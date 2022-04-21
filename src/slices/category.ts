import { createSlice } from '@reduxjs/toolkit';
import type { Category } from '../types/category';
import { initialCategories } from '../data/category';
import {
  getCategories as getCategoriesTask,
  addCategory as addCategoryTask,
  deleteCategory as deleteCategoryTask,
} from '../models/tasks/category';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: initialCategories,
  },
  reducers: {
    getCategories: (state, _action: {}) => {
      state.categories = getCategoriesTask();
    },
    addCategory: (state, action: { payload: Category }) => {
      const category = addCategoryTask(action.payload);
      state.categories.push(category);
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
