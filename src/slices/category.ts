import { createSlice } from '@reduxjs/toolkit';
import type { Category } from '../types/category';
import { initialCategories } from '../data/category';
import {
  getCategories as getCategoriesTask,
  addCategory as addCategoryTask,
} from '../models/tasks';

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
  },
});

export const { addCategory, getCategories } = categorySlice.actions;
export default categorySlice.reducer;
