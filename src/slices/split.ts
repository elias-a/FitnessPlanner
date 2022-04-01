import { createSlice } from '@reduxjs/toolkit';
import type { Split } from '../types/split';

const initialSplit: Split = {
  startDate: '',
  endDate: '',
  categories: {},
  exercises: {},
};

export const splitSplice = createSlice({
  name: 'split',
  initialState: initialSplit,
  reducers: {
    createSplit: (state, action: { payload: Split }) => {
      const { startDate, endDate, categories, exercises } = action.payload;

      state.startDate = startDate;
      state.endDate = endDate;
      state.categories = categories;
      state.exercises = exercises;
    },
  },
});

export const { createSplit } = splitSplice.actions;
export default splitSplice.reducer;
