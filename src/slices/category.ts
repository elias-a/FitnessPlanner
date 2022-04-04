import { createSlice } from '@reduxjs/toolkit';
import type { Category } from '../types/category';
import { initialCategories } from '../data/category';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: initialCategories,
  },
  reducers: {
    addCategory: (state, action: { payload: Category }) => {
      state.categories.push(action.payload);
    },
  },
});

export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;
